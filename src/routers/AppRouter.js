import React from 'react';
import { BrowserRouter, Router, Route, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import AdminRoute from './AdminRoute';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import BlogDashboardPage from '../components/BlogDashboardPage';
import SignupPage from '../components/SignupPage';
import LoginPage from '../components/LoginPage'
import AddPostPage from '../components/AddPostPage';
import PostItem from '../components/PostItem';
import EditPostPage from '../components/EditPostPage';

const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>
    <Switch>
      <Route path="/" exact component={BlogDashboardPage} />
      <PublicRoute path="/signup" component={SignupPage} />
      <PublicRoute path="/signin" component={LoginPage} />
      <Route path="/posts/:id" exact component={PostItem} />
      <AdminRoute path="/addpost" component={AddPostPage} />
      <AdminRoute path="/posts/:id/edit" component={EditPostPage} />
    </Switch>
  </Router>
)

export default AppRouter;