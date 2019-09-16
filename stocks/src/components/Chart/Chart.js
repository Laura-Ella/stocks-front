// import React from 'react';
// import ReactDOM from 'react-dom';

// import {
//     StockChart,
//     ChartTitle,
//     ChartSeries,
//     ChartSeriesItem,
//     ChartNavigator,
//     ChartNavigatorSelect,
//     ChartNavigatorSeries,
//     ChartNavigatorSeriesItem
// } from '@progress/kendo-react-charts';

// import { IntlService } from '@progress/kendo-react-intl';
// import { filterBy } from '@progress/kendo-data-query';

// import 'hammerjs';

// import data from '../../stock-data.json';

// const intl = new IntlService('en');
// const stockData = data.map(item => (Object.assign({}, item, { Date: intl.parseDate(item.Date) })));

// const from = new Date('2009/02/05');
// const to = new Date('2011/10/07');

// export default class StockChartContainer extends React.Component {
//     state = {
//         seriesData: Array.from(stockData),
//         navigatorData: Array.from(stockData)
//     };

//     render() {
//         console.log(stockData)
//         const { seriesData, navigatorData } = this.state;
//         return (
//             <StockChart onNavigatorFilter={this.onNavigatorChange} partialRedraw={true}>
//                 <ChartTitle text="The Boeing Company NYSE:BA" />
//                 <ChartSeries>
//                     <ChartSeriesItem
//                         data={seriesData}
//                         type="candlestick"
//                         openField="Open"
//                         closeField="Close"
//                         lowField="Low"
//                         highField="High"
//                         categoryField="Date"
//                     />
//                 </ChartSeries>
//                 <ChartNavigator>
//                     <ChartNavigatorSelect from={from} to={to} />
//                     <ChartNavigatorSeries>
//                         <ChartNavigatorSeriesItem
//                             data={navigatorData}
//                             type="area"
//                             field="Close"
//                             categoryField="Date"
//                         />
//                     </ChartNavigatorSeries>
//                 </ChartNavigator>
//             </StockChart>
//         );
//     }

//     onNavigatorChange = (event) => {
//         const filters = {
//             logic: 'and',
//             filters: [{
//                 field: 'Date',
//                 operator: 'gte',
//                 value: event.from
//             }, {
//                 field: 'Date',
//                 operator: 'lt',
//                 value: event.to
//             }]
//         };

//         this.setState((prevState) => ({
//             seriesData: filterBy(prevState.navigatorData, filters)
//         }));
//     }
// }

// // ReactDOM.render(
// //     <StockChartContainer />,
// //     document.querySelector('my-app')
// // );

import React, { Component } from "react";
import axios from "axios";
var CanvasJSReact = require("../../canvasjs.react");
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.default.CanvasJSChart;

var dataPoints = [];
class Chart extends Component {

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
    var chart = this.chart;
    axios
      .get(
        "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=demo"
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
