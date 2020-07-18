import React, { Component } from "react";
class CategoryForm extends Component {
  state = {};

  render = () => {
    const { setCategory, createCategory } = this.props;
    return (
      <div>
        <form
          onSubmit={createCategory}
          className=" flex flex-col bg-gray-300 p-4 -m-4 my-3 justify-around"
        >
          <input
            type="text"
            onChange={setCategory}
            className="p-2 rounded shadow mb-4"
            placeholder="Category"
          />
          <input
            type="submit"
            value="Add Category"
            className="p-2 bg-blue-500 text-white rounded"
          />
        </form>
      </div>
    );
  };
}

export default CategoryForm;
