import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { startSetPosts } from '../actions/posts';
import { sortPostsByDate } from '../selectors/posts';

export class PostsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: ''
    };
  }
  async componentDidMount() {
    try {
      if (this.props.posts.length === 0) {
        await this.props.startSetPosts();
      }
    } catch (e) {
      this.setState({ error: e.message });
    }
  }
  handleFetchStatus = () => {
    if (this.state.error) {
      return <p>{this.state.error}</p>;
    } else {
      return <p>Fetching posts...</p>;
    }
  };
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card-columns">
              {this.props.posts.length >= 1
                ? this.props.posts.map(post => {
                    return (
                      <div key={post._id} className="card">
                        <div className="card-body">
                          <h4 className="card-title">{post.title}</h4>
                          <h6 className="card-subtitle text-muted">
                            Posted by {post.author} on {moment(post.createdAt).format('MMM Do YYYY')}
                          </h6>
                          <p className="card-text text-truncate">{post.body}</p>
                          <Link to={`posts/${post._id}`} key={post._id} className="btn btn-outline-secondary">
                            Read More
                          </Link>
                        </div>
                      </div>
                    );
                  })
                : this.handleFetchStatus()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: sortPostsByDate(state.posts)
});

const mapDispatchToProps = dispatch => ({
  startSetPosts: () => dispatch(startSetPosts())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostsList);
