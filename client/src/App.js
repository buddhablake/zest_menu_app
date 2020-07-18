import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import Menu from "./Menu";
import Categories from "./Categories";
import MenuItemForm from "./MenuItemForm";
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
    const {
      image,
      title,
      description,
      price,
      available,
      categoryId,
    } = this.state;
    const menuItem = {
      image,
      title,
      description,
      price,
      available,
    };

    axios.put("/menu/" + categoryId, menuItem).then((response) => {
      this.sortMenu(response.data);
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
    window.confirm("Are you sure you want to delete this item?");
    const id = e.target.value;
    axios.delete("/menu/delete/" + id).then((response) => {
      this.sortMenu(response.data);
    });
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
          <div>
            <ul className="flex">
              <li>
                <Link to="/">Menu</Link>
              </li>

              <li>
                <Link to="/dash">Dashboard</Link>
              </li>
            </ul>
          </div>

          <div className="p-4">
            <Switch>
              <Route exact path="/">
                <div className="flex justify-center min-w-screen">
                  <Menu menu={menu} />
                </div>
              </Route>

              <Route path="/dash">
                <div
                  className="flex justify-around items-center w-full min-h-screen bg-gray-300 p-8 rounded-lg"
                  style={{ minWidth: "850px" }}
                >
                  <div className="flex flex-col ">
                    {/*  <MenuItemForm
                    menu={menu}
                    setItem={setItem}
                    createItem={createItem}
                  />*/}
                    <div className="text-center text-white bg-blue-500 text-3xl p-3 -m-4 z-10 rounded shadow-lg">
                      Live Menu
                    </div>
                    <div
                      className="bg-gray-100 rounded overflow-scroll py-6"
                      style={{ width: "400px", height: "600px" }}
                    >
                      <Menu
                        menu={menu}
                        canEdit={true}
                        deleteItem={deleteItem}
                        updateItem={updateItem}
                      />
                    </div>
                  </div>
                  <div className="">
                    <Categories
                      createCategory={createCategory}
                      setCategory={setCategory}
                      menu={menu}
                      setNewCatOrder={setNewCatOrder}
                    />
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
