import React, { Component } from "react";

class Stocks extends Component {
  render() {
    console.log(this.props.stocks);
    return (
      <div>
        <h1>Stocks</h1>
        <ul>
          {this.props.stocks.map(stock => (
            <li><a href="/stocks">{stock.symbol}</a> - ${stock.bid} - ${stock.ask} - {stock.volume} shares</li>
          ))}
          <button>Add to Watchlist</button>
        </ul>
      </div>
    );
  }
}

export default Stocks;