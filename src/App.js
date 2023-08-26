import "./App.css";
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const App = () => {
  let pageSize = 5;
  let apiKey = "f97762e12792464b8c494ab53cc9644a";
  const [progress, setProgress] = useState(0);

  const mySetProgress = (progress) => {
    setProgress(progress);
  };
  return (
    <>
      <Router>
        <Navbar />
        <LoadingBar color="blue" progress={progress} height={3} />
        <div>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <News
                  mySetProgress={mySetProgress}
                  apiKey={apiKey}
                  key="home"
                  pageSize={pageSize}
                  country="us"
                  category="general"
                />
              }
            />
            <Route
              exact
              path="/business"
              element={
                <News
                  mySetProgress={mySetProgress}
                  apiKey={apiKey}
                  key="business"
                  pageSize={pageSize}
                  country="us"
                  category="business"
                />
              }
            />
            <Route
              exact
              path="/entertainment"
              element={
                <News
                  mySetProgress={mySetProgress}
                  apiKey={apiKey}
                  key="entertainment"
                  pageSize={pageSize}
                  country="us"
                  category="entertainment"
                />
              }
            />
            <Route
              exact
              path="/general"
              element={
                <News
                  mySetProgress={mySetProgress}
                  apiKey={apiKey}
                  key="general"
                  pageSize={pageSize}
                  country="us"
                  category="general"
                />
              }
            />
            <Route
              exact
              path="/health"
              element={
                <News
                  mySetProgress={mySetProgress}
                  apiKey={apiKey}
                  key="health"
                  pageSize={pageSize}
                  country="us"
                  category="health"
                />
              }
            />
            <Route
              exact
              path="/science"
              element={
                <News
                  mySetProgress={mySetProgress}
                  apiKey={apiKey}
                  key="science"
                  pageSize={pageSize}
                  country="us"
                  category="science"
                />
              }
            />
            <Route
              exact
              path="/sports"
              element={
                <News
                  mySetProgress={mySetProgress}
                  apiKey={apiKey}
                  key="sports"
                  pageSize={pageSize}
                  country="us"
                  category="sports"
                />
              }
            />
            <Route
              exact
              path="/technology"
              element={
                <News
                  mySetProgress={mySetProgress}
                  apiKey={apiKey}
                  key="technology"
                  pageSize={pageSize}
                  country="us"
                  category="technology"
                />
              }
            />
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;
