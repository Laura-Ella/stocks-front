import React, { Component } from "react";
import axios from "axios";
var CanvasJSReact = require("../../canvasjs.react");
var CanvasJSChart = CanvasJSReact.default.CanvasJSChart;

var dataPoints = [];
class Chart extends Component {
  constructor(props) {
    super(props) 

    this.state = {
      chart: []
    }
  }

  render() {
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
        <CanvasJSChart options={options} onRef={ref => (this.chart = ref)} />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
    );
  }

  componentDidMount() {
    console.log(this.props)
    var chart = this.chart;
    axios
      .get(
        // "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=demo"
      )
      .then(response => {
        console.log(response);
        return response;
      })
      .then(data => {
        let chartData = data.data["Time Series (Daily)"];
        console.log(chartData["2019-04-24"]);
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
}

export default Chart;
