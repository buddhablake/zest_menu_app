import React, { Component } from "react";
import S3FileUpload from "react-s3";

class MenuItemForm extends Component {
  state = {
    uploading: false,
  };

  uploadFile = (e) => {
    this.setState({
      uploading: true,
    });

    const config = {
      bucketName: "zest-menu-app",
      region: process.env.REACT_APP_REGION,
      accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
    };

    S3FileUpload.uploadFile(e.target.files[0], config).then((response) => {
      console.log(response);
      document.querySelector("#itemImage").value = response.location;
      this.setState({
        uploading: false,
      });
    });
  };

  render = () => {
    const { menu, setItem, createItem } = this.props;
    const { uploading } = this.state;
    const { uploadFile } = this;
    return (
      <div>
        <div className="bg-green-400 p-4 text-center text-white rounded text-2xl font-bold rounded-b-none">
          Add Menu Items
        </div>

        <div className="p-6 bg-gray-300 mb-4 rounded rounded-t-none shadow-2xl">
          <form onSubmit={createItem} className="grid grid-cols-2 gap-4 mt-10">
            <input
              type="file"
              onChange={uploadFile}
              className="col-span-2 cursor-pointer"
            />

            <input
              type="url"
              onChange={setItem}
              id="itemImage"
              style={{ display: "none" }}
            />

            <input
              type="text"
              onChange={setItem}
              id="itemTitle"
              placeholder="title"
              className=" col-span-1 p-2 rounded  shadow"
            />
            <input
              type="number"
              onChange={setItem}
              id="itemPrice"
              placeholder="price"
              className="col-span-1 rounded p-2 shadow"
            />

            <textarea
              onChange={setItem}
              id="itemDescription"
              className="col-span-2 rounded p-2 shadow"
              placeholder="description"
            ></textarea>

            <select
              id="itemCategory"
              onChange={setItem}
              className="col-span-1 p-2 rounded"
            >
              {menu.map((category, index) => {
                return (
                  <option value={category._id} id={category._id} key={index}>
                    {category.category}
                  </option>
                );
              })}
            </select>
            <input
              type="submit"
              value={uploading ? "Uploading..." : "Create Menu Item"}
              className="col-span-1 bg-blue-500 text-white text-md  rounded-md"
              disabled={uploading}
            />
          </form>
        </div>
      </div>
    );
  };
}

export default MenuItemForm;
