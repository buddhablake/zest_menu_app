import React, { Component } from "react";
import axios from "axios";
import "./App.css";
// import Menu from "./Menu";
// import Categories from "./Categories";
// import MenuItemForm from "./MenuItemForm";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class App extends Component {
  // state = {
  //   menu: null,
  //   catOrderId: 0,
  //   category: "",
  // };
  //
  // sortMenu = (menu) => {
  //   menu.sort((a, b) => {
  //     if (a.catOrderId > b.catOrderId) {
  //       return 1;
  //     } else {
  //       return -1;
  //     }
  //   });
  //
  //   const nextCatOrderId = menu[menu.length - 1].catOrderId + 1;
  //
  //   this.setState({
  //     menu,
  //     catOrderId: nextCatOrderId,
  //   });
  // };
  //
  // componentDidMount = () => {
  //   axios.get("/menu").then((response) => {
  //     if (response.data.length) {
  //       this.sortMenu(response.data);
  //     }
  //   });
  // };
  //
  // setCategory = (e) => {
  //   this.setState({
  //     category: e.target.value,
  //   });
  // };
  //
  // createCategory = (e) => {
  //   e.preventDefault();
  //   const { category, catOrderId } = this.state;
  //
  //   axios.post("/menu", { category, catOrderId }).then((response) => {
  //     console.log(response.data);
  //     this.sortMenu(response.data);
  //     this.setState({
  //       category: "",
  //     });
  //   });
  // };
  //
  // setNewCatOrder = (newMenuCatOrder) => {
  //   this.setState({
  //     menu: newMenuCatOrder,
  //   });
  //   axios.post("/new-menu", newMenuCatOrder).then((response) => {});
  // };
  //
  // setItem = (e) => {
  //   this.setState({
  //     image: document.querySelector("#itemImage").value,
  //     title: e.target.id === "itemTitle" ? e.target.value : this.state.title,
  //     description:
  //       e.target.id === "itemDescription"
  //         ? e.target.value
  //         : this.state.description,
  //     price: e.target.id === "itemPrice" ? e.target.value : this.state.price,
  //     available: e.target.id === "itemAvailability" ? e.target.checked : false,
  //     categoryId:
  //       e.target.id === "itemCategory"
  //         ? e.target.value
  //         : document.querySelector("#itemCategory").value,
  //   });
  // };
  //
  // createItem = (e) => {
  //   e.preventDefault();
  //   const {
  //     image,
  //     title,
  //     description,
  //     price,
  //     available,
  //     categoryId,
  //   } = this.state;
  //   const menuItem = {
  //     image,
  //     title,
  //     description,
  //     price,
  //     available,
  //   };
  //
  //   axios.put("/menu/" + categoryId, menuItem).then((response) => {
  //     this.sortMenu(response.data);
  //   });
  // };

  render() {
    return <h1>Hello</h1>;
  }
}

export default App;

// const { menu, category } = this.state;
// const {
//   setCategory,
//   createCategory,
//   setItem,
//   createItem,
//   setNewCatOrder,
// } = this;
// return (
//   <Router>
//     <div>
//       <ul>
//         <li>
//           <Link to="/">Menu</Link>
//         </li>
//
//         <li>
//           <Link to="/dash">Dashboard</Link>
//         </li>
//       </ul>
//     </div>
//
//     <div className="App">
//       <Switch>
//         <Route exact path="/">
//           <Menu menu={menu} />
//         </Route>
//
//         <Route path="/dash">
//           <Categories
//             createCategory={createCategory}
//             setCategory={setCategory}
//             menu={menu}
//             setNewCatOrder={setNewCatOrder}
//           />
//           <MenuItemForm
//             menu={menu}
//             setItem={setItem}
//             createItem={createItem}
//           />
//         </Route>
//       </Switch>
//     </div>
//   </Router>
// );
