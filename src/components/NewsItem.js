import React from "react";

const NewsItem = (props) => {
  //this run before render for every object of this class.
  //and we have to use super() to call the constructor of parent class.
  // we can set state here also.
  // constructor() {
  //   super();
  //   console.log("I am from constructor");
  // }
  let { title, description, imgUrl, newsUrl, author, publishedAt, source } =
    props;
  return (
    <div className="my-4">
      <div className="card">
        <img src={imgUrl} className="card-img-top" alt="" />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}...</p>
          <p className="card-text">
            {" "}
            <small className="text-muted">
              By {author ? author : "unknown"} on{"  "}
              {publishedAt
                ? new Date(publishedAt).toGMTString()
                : "unknown"}{" "}
            </small>{" "}
          </p>
          <span className="badge rounded-pill bg-primary my-2">{source}</span>{" "}
          <br />
          <a
            href={newsUrl}
            rel="noreferrer"
            target="_blank"
            className="btn btn-sm btn-dark"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
