import React from 'react';
import { connect } from 'react-redux';
import validator from 'validator';

import ErrorMessages from './ErrorMessages';
import { startSignup } from '../actions/auth';

export class SignupPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayName: '',
      email: '',
      password: '',
      passwordConfirm: '',
      errors: null
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  onDisplayNameChange = e => {
    this.setState({ displayName: e.target.value });
  };
  onEmailChange = e => {
    this.setState({ email: e.target.value });
  };
  onPasswordChange = e => {
    this.setState({ password: e.target.value });
  };
  onPasswordConfirmChange = e => {
    this.setState({ passwordConfirm: e.target.value });
  };
  renderErrors = () => {
    const { errors } = this.state;
    if (errors && errors.length >= 1) {
      return <ErrorMessages errors={errors} />;
    }
  };
  onSubmit = async e => {
    e.preventDefault();

    const { displayName, email, password, passwordConfirm } = this.state;
    const errors = [];

    if (displayName.length < 6 || displayName.length > 12) {
      errors.push('Display name must be between 6 and 12 characters.');
    }
    if (!validator.isEmail(email)) {
      errors.push('Please enter a valid email.');
    }
    if (password.length < 6 || password.length > 12) {
      errors.push('Password must be between 6 and 12 characters');
    }
    if (!validator.equals(password, passwordConfirm)) {
      errors.push('Passwords must match');
    }

    if (errors.length >= 1) {
      this.setState({ errors });
    } else {
      try {
        await this.props.startSignup(displayName, email, password);
        this.props.history.push('/');
      } catch (e) {
        const errors = [];
        Object.keys(e).forEach(key => {
          errors.push(e[key].message);
        });
        this.setState({ errors });
      }
    }
  };
  render() {
    return (
      <div className="container mt-4">
        <div className="row">
          <div className="container col-lg-5">
            <h3 className="mb-3 text-center">Sign Up</h3>
            {this.renderErrors()}
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="displayname">Display Name:</label>
                <input
                  className="form-control"
                  type="text"
                  name="displayname"
                  placeholder="Enter a 6-12 character display name"
                  onChange={this.onDisplayNameChange}
                  autoFocus
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  className="form-control"
                  type="text"
                  name="email"
                  placeholder="Enter a valid email"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  placeholder="Enter a 6-12 character password"
                  onChange={this.onPasswordChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="passwordConfirm">Confirm Password:</label>
                <input
                  className="form-control"
                  type="password"
                  name="passwordConfirm"
                  placeholder="Re-enter your password"
                  onChange={this.onPasswordConfirmChange}
                />
              </div>
              <div className="form-group">
                <button className="btn btn-primary btn-block">Signup</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startSignup: (displayName, email, password) =>
    dispatch(startSignup(displayName, email, password))
});

export default connect(
  null,
  mapDispatchToProps
)(SignupPage);
