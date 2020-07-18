import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import Menu from "./Menu";
import Categories from "./Categories";
import MenuItemForm from "./MenuItemForm";
import GetStarted from "./GetStarted";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class App extends Component {
  state = {
    menu: null,
    catOrderId: 0,
    category: "",
  };

  //================
  //Orders the menu
  //by category Id
  //set by the user
  //=================
  sortMenu = (menu) => {
    menu.sort((a, b) => {
      if (a.catOrderId > b.catOrderId) {
        return 1;
      } else {
        return -1;
      }
    });

    const nextCatOrderId = menu[menu.length - 1].catOrderId + 1;

    this.setState({
      menu,
      catOrderId: nextCatOrderId,
    });
  };

  //=============
  //READ
  //=============

  componentDidMount = () => {
    axios.get("/menu").then((response) => {
      if (response.data.length) {
        this.sortMenu(response.data);
      }
    });
  };

  //=============
  //CREATE
  //=============
  setCategory = (e) => {
    this.setState({
      category: e.target.value,
    });
  };

  createCategory = (e) => {
    e.preventDefault();
    const { category, catOrderId } = this.state;

    axios.post("/menu", { category, catOrderId }).then((response) => {
      console.log(response.data);
      this.sortMenu(response.data);
      this.setState({
        category: "",
      });
    });
  };

  setNewCatOrder = (newMenuCatOrder) => {
    this.setState({
      menu: newMenuCatOrder,
    });
    axios.post("/new-menu", newMenuCatOrder).then((response) => {});
  };

  setItem = (e) => {
    this.setState({
      image: document.querySelector("#itemImage").value,
      title: e.target.id === "itemTitle" ? e.target.value : this.state.title,
      description:
        e.target.id === "itemDescription"
          ? e.target.value
          : this.state.description,
      price: e.target.id === "itemPrice" ? e.target.value : this.state.price,
      available: e.target.id === "itemAvailability" ? e.target.checked : false,
      categoryId:
        e.target.id === "itemCategory"
          ? e.target.value
          : document.querySelector("#itemCategory").value,
    });
  };

  createItem = (e) => {
    e.preventDefault();
    const { image, title, description, price, categoryId } = this.state;
    const menuItem = {
      image,
      title,
      description,
      price,
    };

    axios.put("/menu/" + categoryId, menuItem).then((response) => {
      this.sortMenu(response.data);
      this.setState({
        image: "",
        title: "",
        description: "",
        price: "",
        categoryId: "",
      });
    });
  };

  //=============
  //Update
  //=============
  updateItem = (updatedItem, id) => {
    axios.put("/menu/update/" + id, updatedItem).then((response) => {
      this.sortMenu(response.data);
    });
  };

  //=============
  //Delete
  //=============

  deleteItem = (e) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      const id = e.target.id;
      axios.delete("/menu/delete/" + id).then((response) => {
        this.sortMenu(response.data);
      });
    }
  };

  render() {
    const { menu, category } = this.state;
    const {
      setCategory,
      createCategory,
      setItem,
      createItem,
      setNewCatOrder,
      deleteItem,
      updateItem,
    } = this;
    return (
      <div className="App">
        <Router>
          <div className="p-4">
            <Switch>
              <Route exact path="/">
                <Menu menu={menu} />
              </Route>

              <Route path="/dash">
                <div style={{ minWidth: "900px" }}>
                  <div className="bg-green-500 min-w-full flex justify-between items-center py-4 px-6 -m-4 mb-6 text-white font-hairline tracking-widest">
                    <h1 className="text-3xl w-1/2">ZEST</h1>
                    <ul className="text-lg font-bold tracking-wider px-6">
                      <li>
                        <Link to="/">Menu</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="grid grid-cols-3 gap-12 w-full min-h-screen bg-gray-300 p-12 rounded-lg">
                    <div className="col-span-1">
                      <Categories
                        createCategory={createCategory}
                        setCategory={setCategory}
                        menu={menu}
                        setNewCatOrder={setNewCatOrder}
                        category={category}
                      />
                    </div>
                    {menu ? (
                      <div className="col-span-2 px-4">
                        <MenuItemForm
                          menu={menu}
                          setItem={setItem}
                          createItem={createItem}
                        />

                        <div className="text-center text-white bg-blue-600 text-3xl p-3 rounded shadow-lg z-10 rounded-b-none  static">
                          Live Menu
                        </div>
                        <div
                          className="bg-gray-100 rounded  rounded-t-none overflow-scroll pb-6"
                          style={{ height: "600px" }}
                        >
                          <Menu
                            menu={menu}
                            canEdit={true}
                            deleteItem={deleteItem}
                            updateItem={updateItem}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="col-span-2 px-4">
                        <GetStarted />
                      </div>
                    )}
                  </div>
                </div>
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
