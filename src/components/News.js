import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
export class News extends Component {
  static defaultProps = {
    country: "us",
    pageSize: 8,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  constructor(props) {
    super(props);
    // we are using state here to store data and then use it in render method
    //we do not use state to set the state but we use setState to set the state
    this.state = {
      articles: [], // this is for storing data from api
      loading: false, // this is for loader to show a spinner when data is loading from api
      page: 1, // this is for pagination
    };
    document.title = `${this.capitalize(this.props.category)} - NewsPhoenix`;
  }

  async pageUpdate() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6cf0bbe9187a4b28b6d746abd799b1de&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }

  //componentDidMount is a lifecycle method which is called after the render method
  // lifecycly methods are called automatically by react and used to perform some actions like fetching data from api or setting state.
  //we use this method to fetch data from api
  // async is used to make the function asynchronous its wait for the data to be fetched from api
  async componentDidMount() {
    this.pageUpdate();
  }

  handleNextClick = async () => {
    // let url = `https://newsapi.org/v2/top-headlines?country=${
    //   this.props.country
    // }&category=${
    //   this.props.category
    // }&apiKey=6cf0bbe9187a4b28b6d746abd799b1de&page=${
    //   this.state.page + 1
    // }&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // this.setState({
    //   page: this.state.page + 1,
    //   articles: parsedData.articles,
    //   loading: false,
    // });
    this.setState({ page: this.state.page + 1 });
    this.pageUpdate();
  };

  handlePrevClick = async () => {
    // let url = `https://newsapi.org/v2/top-headlines?country=${
    //   this.props.country
    // }&category=${
    //   this.props.category
    // }&apiKey=6cf0bbe9187a4b28b6d746abd799b1de&page=${
    //   this.state.page - 1
    // }&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });

    // let data = await fetch(url);
    // let parsedData = await data.json();
    // this.setState({
    //   page: this.state.page - 1,
    //   articles: parsedData.articles,
    //   loading: false,
    // });
    this.setState({ page: this.state.page - 1 });
    this.pageUpdate();
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center my-4">
          NewsPhoenix - Top {this.capitalize(this.props.category)} Headlines
        </h1>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading &&
            this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={
                      element.title ? element.title : "Title is not available"
                    }
                    description={
                      element.description
                        ? element.description
                        : "Description is not available"
                    }
                    imgUrl={
                      element.urlToImage
                        ? element.urlToImage
                        : "https://nypost.com/wp-content/uploads/sites/2/2023/08/newspress-collage-bloc1hoic-1691575117640.jpg?quality=75&strip=all&1691560751&w=1024"
                    }
                    newsUrl={element.url}
                    author={element.author}
                    publishedAt={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; prevois
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
