import React, { Component } from "react";
// import "../../../stocks.json"
import axios from "axios";
import "./News.css"

class News extends Component {
  constructor() {
    super();

    this.state = {
      news: []
    };
  }

  componentDidMount() {
    axios
      .get(
        // "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=b516c042bd1a4f04bfbfe3ea6cbc1ae8"
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
    console.log(this.state.news);
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
            <p>{news.description}</p>
          </div>
        </div>
      );
    });
    return <div>{newsList}</div>;
  }
}

export default News;
