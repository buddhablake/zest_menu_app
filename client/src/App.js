import React, { Component } from "react";
import "./App.css";
import axios from "axios";

class App extends Component {
  // Initialize state
  state = { test: "" };

  // Fetch passwords after first mount
  componentDidMount() {
    axios.get("/test").then((res) => {
      console.log(res);
      this.setState({
        test: res.data.test,
      });
    });
  }

  render() {
    const { test } = this.state;

    return <div>{test}</div>;
  }
}

export default App;
