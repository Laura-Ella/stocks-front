import React, { Component } from "react";
// import { Link, Route } from "react-router-dom";
// import Watchlist from "../Watchlist/Watchlist";
import axios from "axios";
import "../StockDetail/StockDetail.css";

class StockDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      detail: [],
      watchlist: []
    };
  }

  componentDidMount() {
    const symbol = this.props.match.params.symbol;

    axios
      .get(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=6LOWY23ZL9RSJMI7`
      )
      .then(response => {
        let data = response.data["Global Quote"];
        this.setState({ detail: data });
      })
      .catch(err => {
        console.error(err);
      });

    // axios
    //   .get(`https://stocks-api-lr.herokuapp.com/${symbol}`)
    //   .then(response => {
    //     console.log(response.data);
    //     let detail = response.data;
    //     this.setState({ detail: detail });
    //   })
    //   .catch(err => {
    //     console.error(err);
    //   });
  }

  handleSubmit = evt => {
    evt.preventDefault();
    this.props.stocks.map(stock => {
      this.state.watchlist.push(stock);
      if (this.props.match.params.symbol === stock.symbol) {
        console.log(stock);
        // this.setState({ watchlist: stock.bid });
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
    console.log(this.state.detail["02. open"]);
    let stock = this.state.detail;

    // let stockDetail = this.state.detail.map(stock => {
    // console.log(stock);
    return (
      <div>
        <h2>{stock["01. symbol"]}</h2>
        <div>
          <p>Price: ${stock["05. price"]}</p>
          <p>Open: ${stock["02. open"]}</p>
          <p>High: ${stock["03. high"]}</p>
          <p>Percent Change: {stock["10. change percent"]}%</p>
          <p>Volume: {stock["06. volume"]}</p>
          <div className="stockimg">
            {/* <img src="" /> */}
          </div>
        </div>
        <div>
          <button onClick={this.handleSubmit}>Add to Watchlist</button>
          <button onClick={this.handleRemove}>Remove from Watchlist</button>
        </div>
      </div>
    );

    // });

    // return (
    //   <div>
    //     <h1>Stock details</h1>
    //     <p>{stockDetail}</p>
    // <button onChange={this.handleChange} onClick={this.handleSubmit}>
    //   Add to Watchlist
    // </button>
    // <button onClick={this.handleRemove}>Remove from Watchlist</button>
    //     {/* <Link to="/watchlist">Watchlist</Link>
    //     <Route
    //       path="/watchlist"
    //       component={Watchlist}
    //     /> */}
    //   </div>
    // );
  }
}

export default StockDetail;
