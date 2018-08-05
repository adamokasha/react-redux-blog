import React from 'react';
import {connect} from 'react-redux';
import validator from 'validator';

import {startSignup} from '../actions/auth';

class SignupPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayName: '',
      'email': '',
      password: '',
      errors: null
    }
  }
  onDisplayNameChange = (e) => {
    this.setState({displayName: e.target.value})
  }
  onEmailChange = (e) => {
    this.setState({email: e.target.value})
  }
  onPasswordChange = (e) => {
    this.setState({password: e.target.value})
  }
  renderErrors = () => {
    const {errors} = this.state;
    if (errors && errors.length >= 1) {
      return errors.map((error) => {
        return <li>{error}</li>
      })
    }
  }
  onSubmit = async (e) => {
    e.preventDefault()

    const {displayName, email, password} = this.state;
    const errors = [];

    if (displayName.length < 6 || displayName.length > 12) {
      errors.push('Display name must be between 6 and 12 characters.')
    }
    if (!validator.isEmail(email)) {
      errors.push('Please enter a valid email.')
    }
    if (password.length < 6 || password.length > 12) {
      errors.push('Password must be between 6 and 12 characters');
    } 
    
    if (errors.length >= 1) {
      this.setState({errors});
    } else {
      try {
        await this.props.startSignup(displayName, email, password);
        this.props.history.push('/');
      } catch (e) {
        const errors = [];
        Object.keys(e).forEach((key => {
          errors.push(e[key].message);
        }));
        this.setState({errors});
      }
    }
  }
  render() {
    return (
        <div>
          <ul>
            {this.renderErrors()}
          </ul>
          <form onSubmit={this.onSubmit}>
            <input 
              type="text" 
              name="displayname" 
              placeholder="Enter a 6-12 character display name" 
              onChange={this.onDisplayNameChange}
              autoFocus
            />
            <input 
              type="text" 
              name="email" 
              placeholder="Enter a valid email" 
              onChange={this.onEmailChange}
            />
            <input 
              type="password" 
              name="password" 
              placeholder="Enter a 6-12 character password" 
              onChange={this.onPasswordChange}
            />
            <button>Signup</button>
          </form>
        </div>
    ) 
  }
}

const mapDispatchToProps = (dispatch) => ({
  startSignup: (displayName, email, password) => dispatch(startSignup(displayName, email, password))
});

export default connect(null, mapDispatchToProps)(SignupPage);
