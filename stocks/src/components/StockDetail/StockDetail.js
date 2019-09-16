import React, { Component } from "react";
import axios from "axios";
import "../StockDetail/StockDetail.css";
var CanvasJSReact = require("../../canvasjs.react");
var CanvasJSChart = CanvasJSReact.default.CanvasJSChart;

var dataPoints = [];
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
    var chart = this.chart;

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

      axios
        .get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=6LOWY23ZL9RSJMI7`)
        .then(response => {
          console.log(response);
          return response;
        })
        .then(data => {
          let chartData = data.data["Time Series (Daily)"];
          console.log(chartData)
          // console.log(chartData["2019-04-24"]);
          for (var key in chartData) {
            console.log(key);
            dataPoints.push({
              x: new Date(key),
              y: parseInt(chartData[key]["1. open"])
            });
            // console.log(chartData[key])
            console.log(dataPoints);
          }
          chart.render();
        });
  
  }

  // componentWillMount() {
  //   const symbol = this.props.match.params.symbol;

  //   var chart = this.chart;
  //   axios
  //     .get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=demo`)
  //     .then(response => {
  //       console.log(response);
  //       return response;
  //     })
  //     .then(data => {
  //       let chartData = data.data["Time Series (Daily)"];
  //       // console.log(chartData["2019-04-24"]);
  //       for (var key in chartData) {
  //         console.log(key);
  //         dataPoints.push({
  //           x: new Date(key),
  //           y: parseInt(chartData[key]["1. open"])
  //         });
  //         // console.log(chartData[key])
  //         console.log(dataPoints);
  //       }
  //       chart.render();
  //     });
  // }

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
    console.log(this.state.detail);
    let stock = this.state.detail;
    const options = {
      theme: "light2",
      title: {
        text: "Stock Price of NIFTY 50"
      },
      axisY: {
        title: "Price in USD",
        prefix: "$",
        includeZero: false
      },
      data: [
        {
          type: "line",
          xValueFormatString: "MMM YYYY",
          yValueFormatString: "$#,##0.00",
          dataPoints: dataPoints
        }
      ]
    };

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
            <CanvasJSChart options={options} onRef={ref => (this.chart = ref)} />
          </div>
        </div>
        <div>
          <button onClick={this.handleSubmit}>Add to Watchlist</button>
          <button onClick={this.handleRemove}>Remove from Watchlist</button>
        </div>
      </div>
    );
  }
}

export default StockDetail;
