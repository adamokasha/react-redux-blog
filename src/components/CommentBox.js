import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';

import CommentForm from './CommentForm';
import {sortCommentsByDate} from '../selectors/posts';

export class CommentBox extends React.Component {
  renderCommentForm = () => {
    if (this.props.auth.id) {
      return (
        <CommentForm id={this.props.id} />
      )
    }
  }
  renderComments = () => {
    if (this.props.comments.length > 0) {
      return sortCommentsByDate(this.props.comments).map((comment) => {
        return (
          <li key={comment._id}>
            <span>posted by {comment.createdBy} on {moment(comment.date).format('MM-DD-YY [at] HH:mm')}</span>
            <p>{comment.comment}</p>
          </li>
        )
      });
    } else {
      return (
        <p>Be the first to comment...</p>
      )
    }
  }
  render() {
    return (
      <div>
        {
          this.renderCommentForm()
        }
        <ul>
          {
            this.renderComments()
          }
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(CommentBox);