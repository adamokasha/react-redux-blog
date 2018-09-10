import React from "react";
import { connect } from "react-redux";

import { startAddComment } from "../actions/posts";

export class CommentForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: "",
      error: ""
    };
  }
  onCommentChange = e => {
    this.setState({ comment: e.target.value });
  };
  renderError = () => {
    if (this.state.error) {
      return <div className="error-msg text-danger">{this.state.error}</div>;
    }
  };
  onSubmit = e => {
    e.preventDefault();

    const { comment } = this.state;
    if (comment.length < 8 || comment.length > 128) {
      this.setState({ error: "Comment must be between 8 and 128 characters." });
    } else {
      this.setState({ error: "" });
      this.props.startAddComment(this.props.id, this.state.comment);
      this.setState({ comment: "" });
    }
  };
  render() {
    return (
      <div className="mb-3">
        {this.renderError()}
        <form onSubmit={this.onSubmit}>
          <div className="form-group col-md-4 pl-0 mb-2">
            <textarea
              className="form-control"
              id="comment-textarea"
              placeholder="Leave a comment..."
              onChange={this.onCommentChange}
              maxLength={128}
              rows="3"
              value={this.state.comment}
            />
          </div>
          <button className="btn btn-primary">Add Comment</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startAddComment: (id, comment) => dispatch(startAddComment(id, comment))
});

export default connect(
  null,
  mapDispatchToProps
)(CommentForm);
