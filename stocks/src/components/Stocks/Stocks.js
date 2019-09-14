import React, { Component } from "react";
import { Link } from "react-router-dom";

class Stocks extends Component {
  render() {
    console.log(this.props.stocks);
    console.log(this.props);
    let list = this.props.stocks.map(stock => {
      return (
        <div>
          <Link to={"/stock/" + stock.symbol}>
            <li>{stock.symbol} ${stock.bid} ${stock.ask} {stock.percentChange}% {stock.volume} shares</li>
          </Link>
        </div>
      );
    });
    return (
      <div>
        <h1>Stocks</h1>
        <p>{list}</p>
      </div>
    );
  }
}

export default Stocks;
