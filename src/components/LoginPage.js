import React from 'react';
import { connect } from 'react-redux';
import validator from 'validator';

import { startLogin } from '../actions/auth';

export class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: ''
    };
  }
  onEmailChange = e => {
    this.setState({ email: e.target.value }, () => {
      !validator.isEmail(this.state.email)
        ? this.setState({ error: 'Please  enter a valid email' })
        : this.setState({ error: '' });
    });
  };
  onPasswordChange = e => {
    this.setState({ password: e.target.value }, () => {
      validator.isEmpty(this.state.password)
        ? this.setState({ error: 'Please enter your password' })
        : this.setState({ error: '' });
    });
  };
  onSubmit = async e => {
    e.preventDefault();
    try {
      const { email, password } = this.state;
      await this.props.startLogin(email, password);
      this.props.history.push('/');
    } catch (e) {
      return this.setState({ error: e.message });
    }
  };
  isDisabled = () => {
    return !this.state.error &&
      validator.isEmail(this.state.email) &&
      !validator.isEmpty(this.state.password)
      ? false
      : true;
  };
  renderError = () => {
    if (this.state.error) {
      return <p className="error-msg alert alert-danger" role="alert">{this.state.error}</p>;
    }
  };
  render() {
    return (
      <div className="container mt-4">
        <h3 className="mb-3 text-center">Sign In</h3>
        {this.renderError()}
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label for="email">Email</label>
            <input
              className="form-control"
              type="text"
              name="email"
              onChange={this.onEmailChange}
              autoFocus
            />
          </div>
          <div className="form-group">
            <label for="password">Password</label>
            <input
              className="form-control"
              type="password"
              name="password"
              onChange={this.onPasswordChange}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary btn-block" disabled={this.isDisabled()}>Login</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startLogin: (email, password) => dispatch(startLogin(email, password))
});

export default connect(
  null,
  mapDispatchToProps
)(LoginPage);
