import React, { Component } from "react";
import MenuItem from "./MenuItem";
import EditItemForm from "./EditItemForm";
class Menu extends Component {
  state = {};

  render = () => {
    const { menu, canEdit, deleteItem, updateItem } = this.props;

    return (
      <div>
        {menu ? (
          <div className="w-full flex flex-col items-center justify-center bg-blue-100 pl-6 pr-6">
            {menu.map((category, index) => {
              return (
                <div key={index}>
                  <h2>{category.category}</h2>
                  {category.items.map((item, index) => {
                    return (
                      <MenuItem
                        canEdit={canEdit}
                        menu={menu}
                        item={item}
                        deleteItem={deleteItem}
                        category={category}
                        updateItem={updateItem}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    );
  };
}

export default Menu;

// <p className="absolute top-0 left-0 inline bg-pink-200 px-3 py-1 rounded-b rounded-bl-none shadow uppercase text-pink-500 text-xs font-semibold tracking-wider">
//   New
// // </p>
