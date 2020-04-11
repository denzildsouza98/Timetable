import React, { Component } from "react";
import Login from "./components/login";
import Input from "./components/input";
import Generation from "./components/generation";
import Timetable from "./components/timetable";
import "./App.css";

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      current: "input",
    };
    this.handleDataInput = this.handleDataInput.bind(this);
    this.handleGeneration = this.handleGeneration.bind(this);
  }
  handleDataInput(data) {
    this.setState({
      data: data,
    });
    this.setState({
      current: "generation",
    });
  }
  handleGeneration(data) {
    this.setState({
      current: "timetable",
      iteration: data,
    });
  }
  renderSwitch(param) {
    switch (param) {
      case "login":
        return <Login></Login>;
      case "input":
        return <Input sendDataHere={this.handleDataInput}></Input>;
      case "generation":
        return (
          <Generation
            data={this.state.data}
            sendDataHere={this.handleGeneration}
          ></Generation>
        );
      case "timetable":
        return (
          <Timetable
            iteration={this.state.iteration}
            data={this.state.data}
          ></Timetable>
        );
      default:
        return "foo";
    }
  }

  render() {
    return <div className="App">{this.renderSwitch(this.state.current)}</div>;
  }
}

export default App;
