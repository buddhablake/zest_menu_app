const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const menuSchema = new Schema({
  category: { type: String, required: true },
  catOrderId: { type: Number, required: true, default: 0 },
  items: [
    {
      image: { type: String, required: true },
      title: { type: String, required: true },
      description: { type: String, required: true },
      price: { type: Number },
      available: { type: Boolean, default: true },
    },
  ],
});

const Menu = mongoose.model("DemoMenuCat", menuSchema);

module.exports = Menu;
