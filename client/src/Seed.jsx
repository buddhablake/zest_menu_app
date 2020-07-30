import React, { Component } from "react";
import axios from "axios";

const Seed = () => {
  return (
    <button
      onClick={() => {
        axios
          .get("/secret/seed/data/path")
          .then((res) => {
            console.log("DB has been seeded");
          })
          .catch((err) => {
            console.log(err);
          });
      }}
    >
      Seed DB
    </button>
  );
};

export default Seed;
