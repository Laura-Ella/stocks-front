import React, { Component } from "react";
import axios from 'axios';
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stocks: []
    }
  }

  componentDidMount() {
    axios
    .get('https://stocks-api-lr.herokuapp.com/')
    .then(res => {
      console.log(res)
    })
  }

  render() {
    return (
      <div>
        <p>Text</p>
      </div>
    );
  }
}

export default App;
