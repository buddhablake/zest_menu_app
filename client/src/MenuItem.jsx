import React, { Component } from "react";
import EditItemForm from "./EditItemForm";

class MenuItem extends Component {
  state = {
    showEditForm: false,
  };

  toggleEditForm = () => {
    this.setState({
      showEditForm: !this.state.showEditForm,
    });
  };

  render = () => {
    const {
      canEdit,
      item,
      menu,
      category,
      deleteItem,
      updateItem,
    } = this.props;
    const { showEditForm } = this.state;
    const { toggleEditForm } = this;
    return (
      <div>
        <div className="relative bg-white rounded-md overflow-hidden text-gray-800 shadow-2xl m-4">
          {canEdit ? (
            <div>
              <button onClick={toggleEditForm}>Edit</button>
              <button
                value={category._id + "/" + item._id}
                onClick={deleteItem}
              >
                Delete
              </button>
            </div>
          ) : null}

          <div className="">
            <img
              className="object-cover w-full h-64"
              src={item.image}
              alt={item.description}
            />
          </div>
          <div className="px-4 py-6 flex flex-col relative">
            <h1 className="text-xl mb-2 font-semibold ">{item.title}</h1>
            <p className="text-gray-700">{item.description}</p>
            <p className="self-end inline bg-orange-300 absolute top-0 right-0 px-3 py-1 rounded-b rounded-br-none text-orange-800 shadow">
              ${item.price}
            </p>
          </div>
        </div>
        {showEditForm ? (
          <EditItemForm
            item={item}
            menu={menu}
            updateItem={updateItem}
            categoryId={category._id}
          />
        ) : null}
      </div>
    );
  };
}

export default MenuItem;
