import React, { Component } from "react";
import {Link} from 'react-router-dom'
import "./Home.css";

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      list: []
    }
  }

  render() {
    let list = this.props.stocks.map(stock => {
      return (
        <div className="stockcontainer">
          <Link to={"/stock/" + stock.symbol}>
            <a href="#" className="stocklist">{stock.symbol} ${stock.bid} ${stock.ask} {stock.percentChange}% {stock.volume} shares</a>
          </Link>
        </div>
      );
    });

    return (
      <div className="home">
        <div className="images">
          <div className="dow">
            <img src="" />
          </div>
          <div className="spy">
            <img src="" />
          </div>
          <div className="nsdq">
            <img src="" />
          </div>
        </div>
        <div className="stocks">
            <h2>Stocks</h2>
            <div>{list}</div>
        </div>
        <div className="news">
            <h2>News</h2>
            <div>
            <a href="#">Lorem ipsum</a>
            </div>
            <a href="#">Lorem ipsum</a>
            <a href="#">Lorem ipsum</a>
            <a href="#">Lorem ipsum</a>
            <a href="#">Lorem ipsum</a>
            <a href="#">Lorem ipsum</a>
        </div>
      </div>
    );
  }
}

export default Home;
