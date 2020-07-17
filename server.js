const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const db = mongoose.connection;
require("dotenv").config();

//================
//MIDDLEWARE
//================
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

//=====================
//MONGODB/MONGOOSE
//=====================
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

// Error / success
db.on("error", (err) => console.log(err.message + " is Mongod not running?"));
db.on("connected", () => console.log("mongo connected: ", MONGODB_URI));
db.on("disconnected", () => console.log("mongo disconnected"));

app.get("/test", (req, res) => {
  res.json({
    test: "test",
  });
});

app.post("/menu", (req, res) => {
  Menu.create(req.body, (err, newCat) => {
    if (err) {
      res.send(err);
    } else {
      Menu.find({}, (err, menu) => {
        res.json(menu);
      });
    }
  });
});

app.get("/menu/:catId", (req, res) => {
  Menu.categories.find({ _id: req.params.catId }, (err, category) => {
    if (err) {
      res.send(err);
    } else {
      res.json(category);
    }
  });
});

app.get("/menu", (req, res) => {
  Menu.find({}, (err, menu) => {
    if (err) {
      res.send(err);
    } else {
      res.json(menu);
    }
  });
});

app.post("/new-menu", (req, res) => {
  let cats = [...req.body];
  for (let i = 0; i < cats.length; i++) {
    Menu.findByIdAndUpdate(
      cats[i]._id,
      cats[i],
      { new: true },
      (err, updatedCat) => {
        if (err) {
          log(err);
        }
      }
    );
  }
  Menu.find({}, (err, menu) => {
    res.json(menu);
  });
});

app.put("/menu/:id", (req, res) => {
  Menu.findByIdAndUpdate(
    req.params.id,
    { $push: { items: req.body } },
    { new: true },
    (err, newItem) => {
      if (err) {
        res.send(err);
      } else {
        Menu.find({}, (err, menu) => {
          res.json(menu);
        });
      }
    }
  );
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
