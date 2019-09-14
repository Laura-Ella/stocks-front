import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import Watchlist from "../Watchlist/Watchlist";
import axios from "axios";

class StockDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      watchlist: []
    };
  }

  handleSubmit = evt => {
    evt.preventDefault();
    this.props.stocks.map(stock => {
      if (this.props.match.params.symbol === stock.symbol) {
        console.log(stock);
        this.setState({ watchlist: stock.symbol });
      }
    });
    // console.log(set);
    console.log(this.state);

    axios
      .post("https://stocks-api-lr.herokuapp.com/", {
        symbol: this.props.match.params.symbol
      })
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.error(err);
      });
  };

  handleRemove = evt => {
    evt.preventDefault();
    const symbol = this.props.match.params.symbol
    axios
      .delete(`https://stocks-api-lr.herokuapp.com/${symbol}`)
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.error(err);
      });
  };

  render() {
    console.log(this.props);
    console.log(this.state.watchlist);

    let stockDetail = this.props.stocks.map(stock => {
      if (this.props.match.params.symbol === stock.symbol) {
        console.log(stock.symbol);
        return stock.symbol;
      }
    });

    return (
      <div>
        <h1>Stock details</h1>
        <p>{stockDetail}</p>
        <h3>{this.state.watchlist}</h3>
        <button onChange={this.handleChange} onClick={this.handleSubmit}>
          Add to Watchlist
        </button>
        <button onClick={this.handleRemove}>Remove from Watchlist</button>
        <Link to="/watchlist">Watchlist</Link>
        <Route
          path="/watchlist"
          component={Watchlist}
        />
      </div>
    );
  }
}

export default StockDetail;
