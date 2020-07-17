import React, { Component } from "react";
import S3FileUpload from "react-s3";

class MenuItemForm extends Component {
  state = {};

  uploadFile = (e) => {
    const config = {
      bucketName: "zest-menu-app",
      region: process.env.REACT_APP_REGION,
      accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
    };

    S3FileUpload.uploadFile(e.target.files[0], config).then((response) => {
      console.log(response);
      document.querySelector("#itemImage").value = response.location;
    });
  };

  render = () => {
    const { menu, setItem, createItem } = this.props;

    const { uploadFile } = this;
    return (
      <div>
        {menu ? (
          <form onSubmit={createItem}>
            <label>
              Image
              <input type="file" onChange={uploadFile} />
            </label>
            <input
              type="url"
              onChange={setItem}
              id="itemImage"
              style={{ display: "none" }}
            />
            <label>
              Title
              <input type="text" onChange={setItem} id="itemTitle" />
            </label>

            <label>
              Description
              <textarea onChange={setItem} id="itemDescription"></textarea>
            </label>

            <label>
              Price
              <input type="number" onChange={setItem} id="itemPrice" />
            </label>

            <label>
              Available now?
              <input type="checkbox" onChange={setItem} id="itemAvailability" />
            </label>
            <select id="itemCategory" onChange={setItem}>
              {menu.map((category, index) => {
                return (
                  <option value={category._id} id={category._id} key={index}>
                    {category.category} {category._id}
                  </option>
                );
              })}
            </select>
            <input type="submit" value="Create Menu Item" />
          </form>
        ) : null}
      </div>
    );
  };
}

export default MenuItemForm;
