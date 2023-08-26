import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
const News = (props) => {
  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const pageUpdate = async () => {
    props.mySetProgress(8);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.mySetProgress(30);
    let parsedData = await data.json();
    props.mySetProgress(70);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.mySetProgress(100);
  };
  //we use useEffect to call the pageUpdate function when the page is loaded

  useEffect(() => {
    document.title = `${capitalize(props.category)} - NewsPhoenix`;
    pageUpdate();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=${props.apiKey}&page=${
      page + 1
    }&pageSize=${props.pageSize}`;
    setPage(page + 1);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };
  // handleNextClick = async () => {
  //   // let url = `https://newsapi.org/v2/top-headlines?country=${
  //   //   props.country
  //   // }&category=${
  //   //   props.category
  //   // }&apiKey=6cf0bbe9187a4b28b6d746abd799b1de&page=${
  //   //   page + 1
  //   // }&pageSize=${props.pageSize}`;
  //   //
  //   // setLoading(true);
  //   // let data = await fetch(url);
  //   // let parsedData = await data.json();
  //   // setLoading(false);
  //   // setArticles(parsedData.articles);
  //   // setTotalResults(parsedData.totalResults);
  //   // setPage(page + 1);
  //   pageUpdate();
  // };

  // handlePrevClick = async () => {
  //   // let url = `https://newsapi.org/v2/top-headlines?country=${
  //   //   props.country
  //   // }&category=${
  //   //   props.category
  //   // }&apiKey=6cf0bbe9187a4b28b6d746abd799b1de&page=${
  //   //   page - 1
  //   // }&pageSize=${props.pageSize}`;
  //   // setLoading(true);

  //   // let data = await fetch(url);
  //   // let parsedData = await data.json();
  //   // setLoading(false);
  //   // setArticles(parsedData.articles);
  //   // setTotalResults(parsedData.totalResults);
  //   // setPage(page - 1);
  //   pageUpdate();
  // };
  return (
    <>
      <h1 className="text-center" style={{ margin: "90px 0px 10px 0px" }}>
        NewsPhoenix - Top {capitalize(props.category)} Headlines
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container my-3">
          <div className="row">
            {articles.map((element) => {
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
                        : "https://c1.wallpaperflare.com/preview/21/93/67/news-yellow-newspaper-3d.jpg"
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
        </div>
      </InfiniteScroll>
      {/* <div className="container d-flex justify-content-between">
          <button
            disabled={page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={handlePrevClick}
          >
            &larr; prevois
          </button>
          <button
            disabled={
              page + 1 >
              Math.ceil(totalResults / props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={handleNextClick}
          >
            Next &rarr;
          </button>
        </div> */}
    </>
  );
};

News.defaultProps = {
  country: "us",
  pageSize: 8,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};
export default News;
