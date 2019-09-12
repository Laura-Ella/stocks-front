import React, { Component } from "react";
import { Link } from "react-router-dom";

class Stocks extends Component {
  render() {
    console.log(this.props.stocks);
    console.log(this.props)
    return (
      <div>
        <h1>Stocks</h1>
        {this.props.stocks.map(stock => (
            <Link to={"/stocks/" + stock.symbol}><li>{stock.symbol}</li></Link>
        ))}
      </div>
    );
  }
}

export default Stocks;
