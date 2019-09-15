import React, {Component} from 'react'
import "./Table.css"
import axios from 'axios'
import { chownSync } from 'fs'

class Table extends Component {
    constructor(props) {
        super(props)

        this.state = {
            stocks: [
                {
                    "id": 1,
                    "symbol": "NBEV",
                    "bid": 5.34,
                    "ask": 5.39,
                    "percentChange": 2,
                    "volume": 423049
                },
                {
                    "id": 2,
                    "symbol": "MNKD",
                    "bid": 5.34,
                    "ask": 5.39,
                    "percentChange": 2,
                    "volume": 423049
                },
                {
                    "id": 3,
                    "symbol": "TLRY",
                    "bid": 5.34,
                    "ask": 5.39,
                    "percentChange": 2,
                    "volume": 423049
                }
            ]
        }
    }

    // componentDidMount() {
    //     // const symbol = this.props.match.params.symbol
    //     axios
    //     .get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=5min&apikey=6LOWY23ZL9RSJMI7`)
    //     .then(response => {
    //         console.log(response)
    //     })
    //     .catch(err => {
    //         console.error(err)
    //     })
    // }

    renderHeader = () => {
        let tableHeader = Object.keys(this.state.stocks[0])
        return tableHeader.map((key, index) => {
            return <th key={index}>{key.toLocaleUpperCase()}</th>
        })
    }

    render() {
        let tableData = this.state.stocks.map((stock, index) => {
            const { id, symbol, bid, ask, percentChange, volume } = stock
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{symbol}</td>
                    <td>${bid}</td>
                    <td>${ask}</td>
                    <td>{percentChange}%</td>
                    <td>{volume}</td>
                </tr>
            )
        })

        return (
            <div>
                <h1>Stock Table</h1>
                <table>
                    <tbody>
                        <tr>{this.renderHeader()}</tr>
                        {tableData}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Table