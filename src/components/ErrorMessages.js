import React from 'react';

class ErrorMessages extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <ul className="error-list list-group mb-3">
        {this.props.errors.map(error => {
          return (
            <li className="list-group-item list-group-item-danger">{error}</li>
          );
        })}
      </ul>
    );
  }
}

export default ErrorMessages;
