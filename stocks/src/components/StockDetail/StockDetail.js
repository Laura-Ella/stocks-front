import React, {Component} from 'react'

class StockDetail extends Component {
    render() {
        console.log(this.props)
        return (
            <div>
                <h1>Stock details</h1>
                {/* <ul>
                    <li>{this.props}</li>
                </ul> */}
                <button>Add to Watchlist</button>
                <button>Remove from Watchlist</button>
            </div>
        )
    }
}

export default StockDetail