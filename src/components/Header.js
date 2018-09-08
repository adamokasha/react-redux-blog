import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { startLogout } from '../actions/auth';

export class Header extends React.Component {
  renderLinks = () => {
    if (this.props.auth.role === 'admin') {
      return (
        <li className="nav-item">
          <Link to="/addpost" className="nav-link">Add Post</Link>
        </li>
      );
    } else if (!this.props.auth.id) {
      return (
        <div>
          <li className="nav-item d-inline-block">
            <Link to="/signup" className="nav-link">Sign Up</Link>
          </li>
          <li className="nav-item d-inline-block">
            <Link to="/signin" className="nav-link">Sign In</Link>
          </li>
        </div>
      );
    }
  };
  renderSignOutButton = () => {
    if (this.props.auth.id) {
      return (
        <li className="nav-item">
        <button name="signout" onClick={this.props.startLogout} className="btn btn-light">
          Sign Out
        </button>
        </li>
      );
    }
  };
  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-3">
        <div className="container">
          <Link to="/" className="navbar-brand">
            React Blog
          </Link>
          <ul className="navbar-nav">
            {this.renderLinks()}
            {this.renderSignOutButton()}
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  startLogout: token => dispatch(startLogout(token))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
