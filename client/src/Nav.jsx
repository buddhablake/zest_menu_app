import React, { Component } from "react";
import { Link } from "react-router-dom";
class Nav extends Component {
  render = () => {
    return (
      <div className="bg-green-500 min-w-full flex justify-between items-center py-4 px-6 -m-4 mb-6 text-white font-hairline tracking-widest">
        <Link to="/">
          <h1 className="text-3xl w-1/2">ZEST</h1>
        </Link>
        <ul className="text-lg font-bold tracking-wider px-6 flex">
          <li className="px-4">
            <Link to="/">Menu</Link>
          </li>
          <li>
            <Link to="/dash">Dash</Link>
          </li>
        </ul>
      </div>
    );
  };
}

export default Nav;
