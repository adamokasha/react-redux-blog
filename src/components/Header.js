import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';

import {startLogout} from '../actions/auth';

export class Header extends React.Component {
  renderLinks = () => {
    if (this.props.auth.role === 'admin') {
      return <Link to="/addpost">Add Post</Link>
    } else if (!this.props.auth.id) {
      return (
        <div>
          <Link to="/signup">Sign Up</Link>
          <Link to="/signin">Sign In</Link>
        </div>
      )
    }
  }
  renderSignOutButton = () => {
    if (this.props.auth.id) {
      return <button name="signout" onClick={this.props.startLogout}>Sign Out</button>
    }
  }
  render(){
    return (
      <div>
        <Link to="/">React Blog</Link>
        {this.renderLinks()}
        {this.renderSignOutButton()}
    </div>  
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
  startLogout: (token) => dispatch(startLogout(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);