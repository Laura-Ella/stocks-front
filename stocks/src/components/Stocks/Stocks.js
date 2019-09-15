import React, { Component } from "react";
import { Link } from "react-router-dom";

class Stocks extends Component {
  componentDidMount() {
    var unirest = require("unirest");

    var req = unirest(
      "GET",
      "https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-movers"
    );

    req.query({
      region: "US",
      lang: "en"
    });

    req.headers({
      "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
      "x-rapidapi-key": "286817a66emsh28a4e95f2ce95ddp178e23jsn582bf9bb6287"
    });

    req.end(function(res) {
      if (res.error) throw new Error(res.error);

      console.log(res.body.finance.result[0].quotes);
    });
  }

  render() {
    console.log(this.props.stocks);
    console.log(this.props);
    let list = this.props.stocks.map(stock => {
      return (
        <div>
          <Link to={"/stock/" + stock.symbol}>
            <li>
              {stock.symbol} ${stock.bid} ${stock.ask} {stock.percentChange}%{" "}
              {stock.volume} shares
            </li>
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
