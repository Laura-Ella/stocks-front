import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import Stocks from "./components/Stocks/Stocks";
import Watchlist from "./components/Watchlist/Watchlist";
import axios from "axios";
import "./App.css";
import StockDetail from "./components/StockDetail/StockDetail";
import Home from "./components/Home/Home";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stocks: [],
      watchlist: []
    };
  }

  componentDidMount() {
    axios
      .get("https://stocks-api-lr.herokuapp.com/")
      .then(res => {
        this.setState({ stocks: res.data });
        console.log(res);
        console.log(this.state.stocks);
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <nav>
          <Link to="/home">Home</Link>
          <Link to="/stocks">Stocks</Link>
          <Link to="/watchlist/:symbol">Watchlist</Link>
          {/* <Link to="/stock/:symbol">Stock Detail</Link> */}
        </nav>
        <Route path="/home"
        exact component={Home} />
        <Route
          path="/stocks"
          exact
          render={routerProps => (
            <Stocks stocks={this.state.stocks} {...routerProps} />
          )}
        />
        <Route
          path="/watchlist/:symbol"
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
