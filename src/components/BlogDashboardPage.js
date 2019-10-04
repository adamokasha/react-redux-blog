import React from "react";
import { connect } from "react-redux";

import Header from "./Header";
import PostsList from "./PostsList";

export const BlogDashboardPage = ({ displayName }) => {
  function renderWelcome() {
    if (displayName) {
      return <h3>Welcome {displayName}.</h3>;
    }
    return;
  }
  return (
    <div>
      <Header />
      <div id="landing">
        <div className="primary-overlay">
          <div className="container h-100">
            <div className="row hero-text">
              <div className="col-lg-7">
                <h1 className="text-white mb-5">
                  React Blog - Responsive blog styled with Bootstrap 4
                </h1>
                <a
                  href="https://github.com/adamokasha/react-redux-blog"
                  target="_blank"
                  className="text-uppercase text-white hero-link"
                >
                  <u>Learn More</u>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className="container mb-3">{renderWelcome()}</div>
      <div>
        <PostsList />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  displayName: state.auth.displayName
});

export default connect(mapStateToProps)(BlogDashboardPage);
