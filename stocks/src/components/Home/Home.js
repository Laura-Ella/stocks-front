import React, { Component } from "react";
import "./Home.css";

class Home extends Component {
  render() {
    return (
      <div className="home">
        <div className="images">
          <div className="dow">
            {/* <img src="" /> */}
          </div>
          <div className="spy">
            {/* <img src="" /> */}
          </div>
          <div className="nsdq">
            {/* <img src="" /> */}
          </div>
        </div>
        <div>
            <h2>Stocks</h2>
        </div>
      </div>
    );
  }
}

export default Home;
