import React, { Component } from "react";
import { Link } from "react-router-dom";
import {BrowserRouter as Router, Route} from "react-router-dom"
import Stocks from "./components/Stocks/Stocks";
import Watchlist from "./components/Watchlist/Watchlist";
import axios from "axios";
import "./App.css";
import StockDetail from "./components/StockDetail/StockDetail";
import Home from "./components/Home/Home";
import Chart from "./components/Chart/Chart"
import News from "./components/News/News"

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stocks: [],
      search: '',
      matches: [],
      redirect: false
    };
  }

  componentDidMount() {
    var unirest = require("unirest");

    var req = unirest(
      "GET",
      "https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-quotes"
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

  handleChange = evt => {
    this.setState({search: evt.target.value})
  }

  handleSubmit = () => {
    const search = this.state.search
    axios
      .get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${search}&apikey=6LOWY23ZL9RSJMI7`)
      .then(response => {
        console.log(response)
        this.setState({matches: response.data.bestMatches[0]})
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    console.log(this.state.matches);
    return (
      <div>
        <nav>
          <div>
          <input type="text" name="search" placeholder="Stock Symbol" value={this.state.search} onChange={this.handleChange}></input>
          <Link to={"/stock/" + this.state.search}><button type="submit" onClick={this.handleSubmit}>Search</button></Link>
          </div>
          <Link to="/home">Home</Link>
          <Link to="/stocks">Stocks</Link>
          <Link to="/news">News</Link>
          <Link to="/watchlist/">Watchlist</Link>
        </nav>
        <Route path="/home"
        exact render={routerProps => (
          <Home stocks={this.state.stocks} {...routerProps} />
        )} />
        <Route
          path="/stocks"
          exact
          render={routerProps => (
            <Stocks stocks={this.state.stocks} {...routerProps} />
          )}
        />
        <Route path="/news" exact component={News}/>
        <Route
          path="/watchlist/"
          exact
          render={routerProps => (
            <Watchlist stocks={this.state.stocks} {...routerProps} />
          )}
        />
        <Route
          path="/stock/:symbol"
          exact
          component={routerProps => (
            <StockDetail stocks={this.state.stocks} {...routerProps} />
          )}
        />
      </div>
    );
  }
}

export default App;
