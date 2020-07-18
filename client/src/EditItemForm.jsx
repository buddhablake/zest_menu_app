import React, { Component } from "react";
import S3FileUpload from "react-s3";

class EditItemForm extends Component {
  state = {};

  componentDidMount = () => {
    this.setState({
      image: this.props.item.image,
      title: this.props.item.title,
      description: this.props.item.description,
      price: this.props.item.price,
      available: this.props.item.available,
    });
  };

  setUpdatedItem = (e) => {
    const { item } = this.props;
    this.setState({
      title: e.target.id === "updatedItemTitle" ? e.target.value : item.title,
      description:
        e.target.id === "updatedItemDescription"
          ? e.target.value
          : item.description,
      price: e.target.id === "updatedItemPrice" ? e.target.value : item.price,
      available:
        e.target.id === "updatedItemAvailability" ? e.target.checked : false,
    });
  };

  sendUpdatedItem = (e) => {
    e.preventDefault();
    const { updateItem, categoryId, item, toggleEditForm } = this.props;
    const id = categoryId + "/" + item._id;
    updateItem(this.state, id);
    toggleEditForm();
  };

  uploadFile = (e) => {
    const config = {
      bucketName: "zest-menu-app",
      region: process.env.REACT_APP_REGION,
      accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
    };

    S3FileUpload.uploadFile(e.target.files[0], config).then((response) => {
      this.setState({
        image: response.location,
      });
    });
  };

  render = () => {
    const { menu, item } = this.props;
    const { uploadFile, setUpdatedItem, sendUpdatedItem } = this;
    return (
      <form onSubmit={sendUpdatedItem} className="grid grid-cols-2 gap-4 mt-10">
        <input
          type="file"
          onChange={uploadFile}
          className="col-span-2 cursor-pointer block"
        />

        <input
          type="text"
          defaultValue={item.title}
          onChange={setUpdatedItem}
          id="updatedItemTitle"
          placeholder="title"
          className="col-span-1 p-2 rounded  shadow"
        />

        <input
          type="number"
          defaultValue={item.price}
          onChange={setUpdatedItem}
          id="updatedItemPrice"
          placeholder="price"
          className="col-span-1 rounded p-2 shadow"
        />

        <textarea
          defaultValue={item.description}
          onChange={setUpdatedItem}
          id="updatedItemDescription"
          className="col-span-2 rounded p-2 shadow"
          placeholder="description"
        ></textarea>

        {/*
        <label>
          Available now?
          {item.available ? (
            <input
              type="checkbox"
              onChange={setUpdatedItem}
              id="updatedItemAvailability"
              checked
            />
          ) : (
            <input
              type="checkbox"
              onChange={setUpdatedItem}
              id="updatedItemAvailability"
            />
          )}
        </label>
        */}

        <input
          type="submit"
          value="Update Item"
          className="col-span-1 bg-orange-400 text-white text-md  rounded-md col-span-2 text-md p-2"
        />
      </form>
    );
  };
}

export default EditItemForm;
