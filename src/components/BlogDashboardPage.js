import React from 'react';

import Header from './Header';
import PostsList from './PostsList';

const BlogDashboardPage = () => {
  return (
    <div>
      <Header />
      <div>
        <h1>Welcome to the blog dashboard page</h1>
        <PostsList />
      </div>
    </div>
  )
}

export default BlogDashboardPage;