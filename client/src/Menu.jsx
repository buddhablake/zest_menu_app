import React, { Component } from "react";
import MenuItem from "./MenuItem";
import EditItemForm from "./EditItemForm";
class Menu extends Component {
  state = {};

  render = () => {
    const { menu, canEdit, deleteItem, updateItem } = this.props;

    return (
      <div style={{ maxWidth: "500px" }}>
        {menu ? (
          <div className="flex flex-col items-center justify-center pl-6 pr-6">
            {menu.map((category, index) => {
              return (
                <div>
                  {category.items.length ? (
                    <div key={index}>
                      <h2 className="text-center w-full text-2xl text-gray-800 pt-4">
                        {category.category}
                      </h2>
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
                  ) : null}{" "}
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
