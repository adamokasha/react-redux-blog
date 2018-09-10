import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { startLogout } from "../actions/auth";

export class Header extends React.Component {
  renderLinks = () => {
    if (this.props.auth.role === "admin") {
      return (
        <li className="nav-item d-sm-inline-block">
          <Link to="/addpost" className="nav-link">
            <i className="fas fa-pencil-alt" /> Add Post
          </Link>
        </li>
      );
    } else if (!this.props.auth.id) {
      return (
        <div>
          <li className="nav-item d-sm-inline-block">
            <Link to="/signup" className="nav-link">
              Sign Up
            </Link>
          </li>
          <li className="nav-item d-sm-inline-block">
            <Link to="/signin" className="nav-link">
              Sign In
            </Link>
          </li>
        </div>
      );
    }
  };
  renderSignOutButton = () => {
    if (this.props.auth.id) {
      return (
        <li className="nav-item">
          <button
            name="signout"
            onClick={this.props.startLogout}
            className="btn btn-secondary"
          >
            Sign Out
          </button>
        </li>
      );
    }
  };
  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-light bg-light fixed-top py-4">
        <div className="container">
          <Link to="/" className="navbar-brand">
            <h3 className="mb-0">React Blog</h3>
          </Link>
          <button
            className="navbar-toggler collapsed"
            data-toggle="collapse"
            data-target="#navbarCollapse"
            aria-expanded="false"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="navbar-collapse collapse" id="navbarCollapse">
            <ul className="navbar-nav ml-auto">
              {this.renderLinks()}
              {this.renderSignOutButton()}
            </ul>
          </div>
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
