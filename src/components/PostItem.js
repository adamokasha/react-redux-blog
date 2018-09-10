import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

import Header from './Header';
import CommentBox from './CommentBox';
import { startSetPosts } from '../actions/posts';

export class PostItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: ''
    };
  }
  async componentDidMount() {
    window.scrollTo(0, 0);
    if (!this.props.post) {
      try {
        await this.props.startSetPosts();
      } catch (e) {
        this.setState({ error: e.message });
      }
    }
  }
  renderEditButton() {
    if (this.props.auth.role === 'admin') {
      return (
        <Link
          to={`/posts/${this.props.post._id}/edit`}
          className="btn btn-dark btn-md float-right"
        >
          <i className="far fa-edit" /> Edit
        </Link>
      );
    }
  }
  renderMainImage(post) {
    if (post.mainImage) {
      return (
        <img src={post.mainImage} className="img-fluid rounded float-left mr-3 mb-3 d-none d-md-inline-block w-50" />
      );
    }
  }
  renderPost() {
    if (this.props.post) {
      return (
        <div className="container post-item">
          <div>
            {this.renderEditButton()}
            <h2>{this.props.post.title}</h2>
            <p className="text-muted">
              Posted by {this.props.post.author} on{' '}
              {moment(this.props.post.createdAt).format('MMMM Do YYYY')}.
            </p>
            {this.renderMainImage(this.props.post)}
            <p>{this.props.post.body}</p>
          </div>
          <CommentBox
            id={this.props.post._id}
            comments={this.props.post.comments}
          />
        </div>
      );
    }
    return (
      <div className="container post-item">
        <div className="alert alert-danger" role="alert">
          Could not retrieve post...
          <Link to="/" className="alert-link">
            Click here
          </Link>{' '}
          to go back to dashboard.
        </div>
      </div>
    );
  }
  render() {
    return (
      <div>
        <Header />
        {this.renderPost()}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  auth: state.auth,
  post: state.posts.find(post => post._id === props.match.params.id) || null
});

export default connect(
  mapStateToProps,
  { startSetPosts }
)(PostItem);
