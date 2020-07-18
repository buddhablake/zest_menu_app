import React, { Component } from "react";
class CategoryForm extends Component {
  state = {};

  render = () => {
    const { setCategory, createCategory } = this.props;
    return (
      <div>
        <form
          onSubmit={createCategory}
          className="flex flex-col bg-gray-400 p-4 -m-4 mb-6"
        >
          <input
            type="text"
            onChange={setCategory}
            className="p-2 rounded m-2 shadow"
            placeholder="Category"
          />
          <input
            type="submit"
            value="Add Category"
            className="p-2 bg-blue-600 text-white rounded my-2"
          />
        </form>
      </div>
    );
  };
}

export default CategoryForm;
