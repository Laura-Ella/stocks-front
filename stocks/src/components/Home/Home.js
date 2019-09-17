import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Home.css";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      news: []
    };
  }

  // renderHeader = () => {
  //   let tableHeader = Object.keys(this.props.stocks[0]);
  //   return tableHeader.map((key, index) => {
  //     return <th key={index}>{key.toLocaleUpperCase()}</th>;
  //   });
  // };

  componentDidMount() {
    axios
      .get(
        "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=b516c042bd1a4f04bfbfe3ea6cbc1ae8"
      )
      .then(response => {
        console.log(response.data.articles);
        this.setState({ news: response.data.articles });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    console.log(this.props);

    let newsList = this.state.news.map(news => {
      return (
        <div className="newscontainer">
          <div className="urltoimage">
            {/* <img src={news.urlToImage} /> */}
          </div>
          <div className="newstext">
            <a href={news.url}>
              <h3>{news.title}</h3>
            </a>
            <p>{news.author}</p>
            {/* <p>{news.description}</p> */}
          </div>
        </div>
      );
    });

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
            <img src="" alt="" />
          </div>
          <div className="spy">
            <img src="" alt="" />
          </div>
          <div className="nsdq">
            <img src="" alt="" />
          </div>
        </div>
        <div className="container">
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
            <h2>Headline News</h2>
            <div>{newsList}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
