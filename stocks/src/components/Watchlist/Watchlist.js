import React, { Component } from "react";
import {Link} from 'react-router-dom'
import axios from 'axios'

class Watchlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stocks: []
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
    console.log(this.props);
    let stocks = this.state.stocks.map(stock => {
        return (
            <ul>
                <Link to={"/stock/" + stock.symbol}>{stock.symbol}</Link>
            </ul>
        )
    })
    return (
      <div>
        <h1>Watchlist</h1>
        <p>{stocks}</p>
      </div>
    );
  }
}

export default Watchlist;