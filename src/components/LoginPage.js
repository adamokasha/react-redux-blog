import React from 'react';
import { connect } from 'react-redux';
import validator from 'validator';

import {startLogin} from '../actions/auth';

class LoginPage extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: ''
    }
  }
  onEmailChange = (e) => {
    this.setState({email: e.target.value}, () => {
      !validator.isEmail(this.state.email) ? this.setState({error: 'Please  enter a valid email'}) : this.setState({error: ''});
    });
  }
  onPasswordChange = (e) => {
    this.setState({password: e.target.value}, () => {
      validator.isEmpty(this.state.password) ? this.setState({error: 'Please enter your password'}) : this.setState({error: ''});
    });
  }
  onSubmit = async (e) => {
    e.preventDefault();
    try {
      const {email, password} = this.state;
      await this.props.startLogin(email, password);
      this.props.history.push('/');
    } catch (e) {
      return this.setState({error: e.message})
    }
  }
  isDisabled = () => {
    return !this.state.error && validator.isEmail(this.state.email) && !validator.isEmpty(this.state.password)? false : true;
  }
  renderError = () => {
    if(this.state.error) {
      return (
        <p>{this.state.error}</p>
      )
    }
  }
  render() {
    return (
      <div>
        {this.renderError()}
        <form onSubmit={this.onSubmit}>
          <input 
            type="text" 
            name="email" 
            onChange={this.onEmailChange}
            autoFocus
          />
          <input 
            type="password" 
            name="password" 
            onChange={this.onPasswordChange}
          />
          <button disabled={this.isDisabled()}>Login</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  startLogin: (email, password) => dispatch(startLogin(email, password))
});

export default connect(null, mapDispatchToProps)(LoginPage);