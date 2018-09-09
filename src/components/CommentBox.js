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
    return <p className="font-italic">You must be signed in to comment...</p>
  }
  renderComments = () => {
    if (this.props.comments.length > 0) {
      return sortCommentsByDate(this.props.comments).map((comment) => {
        return (
          <li className="list-group-item pl-0" key={comment._id}>
            <p className="text-muted mb-1">Posted by {comment.createdBy} on {moment(comment.date).format('MM-DD-YY [at] HH:mm')}</p>
            <p className="mb-1">{comment.comment}</p>
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
        <h4>Comments</h4>
        {
          this.renderCommentForm()
        }
        <ul className="list-group-flush pl-0">
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