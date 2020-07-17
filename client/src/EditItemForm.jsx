import React, { Component } from "react";
import S3FileUpload from "react-s3";

class EditItemForm extends Component {
  state = {
    image: document.querySelector("#updatedItemImage").value,
    title: this.props.item.title,
    description: this.props.item.description,
    price: this.props.item.price,
    available: this.props.item.available,
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
    const { updateItem, categoryId, item } = this.props;
    const id = categoryId + "/" + item._id;
    updateItem(this.state, id);
  };

  uploadFile = (e) => {
    const config = {
      bucketName: "zest-menu-app",
      region: process.env.REACT_APP_REGION,
      accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
    };

    S3FileUpload.uploadFile(e.target.files[0], config).then((response) => {
      console.log(response);
      document.querySelector("#updatedItemImage").value = response.location;
    });
  };

  render = () => {
    const { menu, item } = this.props;
    const { uploadFile, setUpdatedItem, sendUpdatedItem } = this;
    return (
      <form onSubmit={sendUpdatedItem}>
        <label>
          Image
          <input type="file" onChange={uploadFile} />
        </label>
        <input
          type="url"
          id="updatedItemImage"
          defaultValue={item.image}
          style={{ display: "block" }}
        />
        <label>
          Title
          <input
            type="text"
            defaultValue={item.title}
            onChange={setUpdatedItem}
            id="updatedItemTitle"
          />
        </label>

        <label>
          Description
          <textarea
            defaultValue={item.description}
            onChange={setUpdatedItem}
            id="updatedItemDescription"
          ></textarea>
        </label>

        <label>
          Price
          <input
            type="number"
            defaultValue={item.price}
            onChange={setUpdatedItem}
            id="updatedItemPrice"
          />
        </label>

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

        <input type="submit" value="Update Item" />
      </form>
    );
  };
}

export default EditItemForm;
