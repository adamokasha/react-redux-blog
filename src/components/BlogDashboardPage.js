import React from 'react';
import { connect } from 'react-redux';

import Header from './Header';
import PostsList from './PostsList';

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
      <br></br>
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
