import React, { Component } from "react";

class Menu extends Component {
  state = {};

  render = () => {
    const { menu } = this.props;
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
                      <div>
                        <div className="relative bg-white rounded-md overflow-hidden text-gray-800 shadow-2xl m-4">
                          <div ClassName="">
                            <img
                              className="object-cover w-full h-64"
                              src={item.image}
                              alt={item.description}
                            />
                          </div>
                          <div className="px-4 py-6 flex flex-col relative">
                            <h1 className="text-xl mb-2 font-semibold ">
                              {item.title}
                            </h1>
                            <p className="text-gray-700">{item.description}</p>
                            <p className="self-end inline bg-orange-300 absolute top-0 right-0 px-3 py-1 rounded-b rounded-br-none text-orange-800 shadow">
                              ${item.price}
                            </p>
                          </div>
                        </div>
                      </div>
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
