import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: []
    };
  }

  // renderHeader = () => {
  //   let tableHeader = Object.keys(this.props.stocks[0]);
  //   return tableHeader.map((key, index) => {
  //     return <th key={index}>{key.toLocaleUpperCase()}</th>;
  //   });
  // };

  render() {
    console.log(this.props);

    let tableData = this.props.stocks.map((stock, index) => {
      const {
        symbol,
        regularMarketPrice,
        regularMarketChangePercent,
        regularMarketVolume
      } = stock;
      return (
        <tr key={symbol}>
          <Link to={"/stock/" + stock.symbol}>
            <td>{symbol}</td>
          </Link>
          <td>${regularMarketPrice}</td>
          <td>{regularMarketChangePercent}%</td>
          <td>{regularMarketVolume}</td>
        </tr>
      );
    });

    return (
      <div className="home">
        <div className="images">
          <div className="dow">
            <img src="" />
          </div>
          <div className="spy">
            <img src="" />
          </div>
          <div className="nsdq">
            <img src="" />
          </div>
        </div>
        <div className="stocks">
          <h2>Popular Stocks</h2>
          <table>
            <tbody>
              {/* <tr>{this.renderHeader()}</tr> */}
              {tableData}
            </tbody>
          </table>
        </div>
        <div className="news">
          <h2>News</h2>
          <div>
            <a href="#">Lorem ipsum</a>
          </div>
          <a href="#">Lorem ipsum</a>
          <a href="#">Lorem ipsum</a>
          <a href="#">Lorem ipsum</a>
          <a href="#">Lorem ipsum</a>
          <a href="#">Lorem ipsum</a>
        </div>
      </div>
    );
  }
}

export default Home;
