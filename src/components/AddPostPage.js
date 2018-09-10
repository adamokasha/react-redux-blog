import React from "react";
import { connect } from "react-redux";

import PostForm from "./PostForm";
import { startAddPost } from "../actions/posts";

export class AddPostPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: ""
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  renderError = () => {
    if (this.state.error) {
      return (
        <div className="error-msg alert alert-danger" role="alert">
          <p>{this.state.error}</p>
        </div>
      );
    }
  };
  onSubmit = async post => {
    try {
      await this.props.startAddPost(post);
      this.props.history.push("/");
    } catch (e) {
      this.setState({ error: e.message });
    }
  };
  render() {
    return (
      <div className="container">
        <h3 className="text-center mt-4">Add Post</h3>
        {this.renderError()}
        <PostForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startAddPost: post => dispatch(startAddPost(post))
});

export default connect(
  null,
  mapDispatchToProps
)(AddPostPage);
