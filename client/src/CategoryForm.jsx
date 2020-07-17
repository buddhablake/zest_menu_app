import React, { Component } from "react";
class CategoryForm extends Component {
  state = {};

  render = () => {
    const { setCategory, createCategory } = this.props;
    return (
      <div>
        <form onSubmit={createCategory}>
          <input type="text" onChange={setCategory} />
          <input type="submit" value="Add Category" />
        </form>
      </div>
    );
  };
}

export default CategoryForm;
