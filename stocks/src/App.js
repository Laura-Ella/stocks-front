import React, { Component } from "react";
import {Link, Route} from 'react-router-dom'
import Stocks from './components/Stocks/Stocks'
import Watchlist from './components/Watchlist/Watchlist'
import axios from 'axios';
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stocks: []
    }
  }

  componentDidMount() {
    axios
    .get('https://stocks-api-lr.herokuapp.com/')
    .then(res => {
      this.setState({stocks: res.data})
      console.log(res)
      console.log(this.state.stocks)
    })
    .catch(err => {
      console.error(err)
    })
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <Link to="/stocks">Stocks</Link>
        <Link to="/watchlist">Watchlist</Link>
        <Route path="/stocks" exact render={routerProps => (
        <Stocks stocks={this.state.stocks} {...routerProps} />)} />
        <Route path="/watchlist" exact component={Watchlist} />
      </div>
    );
  }
}

export default App;
