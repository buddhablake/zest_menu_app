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
          <div>
            {menu.map((category, index) => {
              return (
                <div>
                  {category.items.length ? (
                    <div key={index}>
                      <h2 className="text-center w-full text-2xl text-gray-800 pt-4">
                        {category.category}
                      </h2>
                      <div
                        className="grid"
                        style={{
                          gridTemplateColumns:
                            "repeat(auto-fit, minmax(300px, 1fr))",
                        }}
                      >
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
