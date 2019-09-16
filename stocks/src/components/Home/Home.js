import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import "./Home.css";
var CanvasJSReact = require("../../canvasjs.react");
var CanvasJSChart = CanvasJSReact.default.CanvasJSChart;


var dataPoints = [];
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

  // componentDidMount() {
  //   console.log(this.props);
  //   var chart = this.chart;
  //   axios
  //     .get(
  //       "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=SPY&apikey=6LOWY23ZL9RSJMI7"
  //     )
  //     .then(response => {
  //       console.log(response);
  //       return response;
  //     })
  //     .then(data => {
  //       let chartData = data.data["Time Series (Daily)"];
  //       for (var key in chartData) {
  //         dataPoints.push({
  //           x: new Date(key),
  //           y: parseInt(chartData[key]["1. open"])
  //         });
  //       }
  //       chart.render();
  //     });
  // }

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

    // const options = {
    //   theme: "light2",
    //   title: {
    //     text: `Stock Price of SPY`
    //   },
    //   axisY: {
    //     title: "Price in USD",
    //     prefix: "$",
    //     includeZero: true
    //   },
    //   data: [
    //     {
    //       type: "line",
    //       xValueFormatString: "MMM YYYY",
    //       yValueFormatString: "$#,###.##",
    //       dataPoints: dataPoints
    //     }
    //   ]
    // };

    console.log(this.props);

    let newsList = this.state.news.map(news => {
      return (
        <div className="container">
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
            <img src="" />
          </div>
          <div className="spy">
            <img src="" />
            {/* <CanvasJSChart options={options} onRef={ref => (this.chart = ref)} /> */}
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
          <h2>Headline News</h2>
          <div>
            {newsList}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
