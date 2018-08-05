import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import Header from '../components/Header';

const PrivateRoute = ({
  component: Component, 
  isAdmin,
  ...rest
}) => (
  <Route 
    {...rest}
    render={(props) => (
      isAdmin ? (
        <div>
          <Header />
          <Component {...props} />
        </div>
      ) : (
        <Redirect to="/" />
      )
    )}
  />
)

const mapStateToProps = (state) => ({
  isAdmin: state.auth.role === 'admin'
});

export default connect(mapStateToProps)(PrivateRoute);