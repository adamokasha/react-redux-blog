import React from 'react';

class ErrorsList extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <ul className="error-list list-group mb-3">
        {this.props.errors.map((error, i) => {
          return (
            <li key={i} className="list-group-item list-group-item-danger">{error}</li>
          );
        })}
      </ul>
    );
  }
}

export default ErrorsList;
