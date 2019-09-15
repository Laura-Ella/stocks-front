import React, { Component } from "react";
// import { Link, Route } from "react-router-dom";
// import Watchlist from "../Watchlist/Watchlist";
import axios from "axios";

class StockDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      detail: []
    };
  }

  componentDidMount() {
    const symbol = this.props.match.params.symbol;

    axios
      .get(`https://stocks-api-lr.herokuapp.com/${symbol}`)
      .then(response => {
        console.log(response.data);
        let detail = response.data;
        this.setState({ detail: detail });
      })
      .catch(err => {
        console.error(err);
      });
  }

  // handleSubmit = evt => {
  //   evt.preventDefault();
  //   this.props.stocks.map(stock => {
  //     if (this.props.match.params.symbol === stock.symbol) {
  //       console.log(stock);
  //       this.setState({ symbol: stock.bid });
  //     }
  //   });
  //   // console.log(set);
  //   console.log(this.state);

  //   axios
  //     .post("https://stocks-api-lr.herokuapp.com/", {
  //       symbol: this.props.match.params.symbol
  //     })
  //     .then(response => {
  //       console.log(response);
  //     })
  //     .catch(err => {
  //       console.error(err);
  //     });
  // };

  handleRemove = evt => {
    evt.preventDefault();
    const symbol = this.props.match.params.symbol;
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
    console.log(this.state.detail);

    let stockDetail = this.state.detail.map(stock => {
      console.log(stock);
      return (
        <div>
          <div>
            <h2>{stock.symbol}</h2>
            <p>Bid: {stock.bid}</p>
            <p>Ask: {stock.ask}</p>
            <p>Volume: {stock.volume}</p>
          </div>
          <div></div>
        </div>
      );
    });

    return (
      <div>
        <h1>Stock details</h1>
        <p>{stockDetail}</p>
        <button onChange={this.handleChange} onClick={this.handleSubmit}>
          Add to Watchlist
        </button>
        <button onClick={this.handleRemove}>Remove from Watchlist</button>
        {/* <Link to="/watchlist">Watchlist</Link>
        <Route
          path="/watchlist"
          component={Watchlist}
        /> */}
      </div>
    );
  }
}

export default StockDetail;
