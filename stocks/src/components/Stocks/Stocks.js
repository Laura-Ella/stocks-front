import React, { Component } from "react";
import { Link } from "react-router-dom";

class Stocks extends Component {
  constructor() {
    super();

    this.state = {
      stocks: []
    };
  }

  componentDidMount() {
    console.log(this);
    var unirest = require("unirest");

    var req = unirest(
      "GET",
      // "https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-quotes"
    );

    req.query({
      region: "US",
      lang: "en",
      symbols: "BAC,AAPL,GOOG,WKHS,FB,MSFT,BA,AMZN,DIS"
    });

    req.headers({
      "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
      "x-rapidapi-key": "286817a66emsh28a4e95f2ce95ddp178e23jsn582bf9bb6287"
    });

    req.end(res => {
      if (res.error) throw new Error(res.error);
      console.log(res.body.quoteResponse.result);
      this.setState({ stocks: res.body.quoteResponse.result });
      console.log(this.state)
    });
  }

  render() {
    console.log(this.state.stocks);
    let list = this.state.stocks.map(stock => {
      return (
        <div>
          <Link to={"/stock/" + stock.symbol}>
            <li>
              {stock.symbol} 
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
