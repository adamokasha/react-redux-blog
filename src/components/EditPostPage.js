import React from 'react';
import {connect} from 'react-redux';

import PostForm from './PostForm';
import {startEditPost} from '../actions/posts';
import {startDeletePost} from '../actions/posts';

export class EditPostPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: ''
    }
  }
  renderError = () => {
    if(this.state.error) {
      return (
        <div className="error-msg">
          <p>{this.state.error}</p>
        </div>
      )
    }
  }
  onSubmit = async (post) => {
    try {
      await this.props.startEditPost(post, this.props.post._id);
      this.props.history.push('/');
    } catch (e) {
      this.setState({error: e.message});
    }
  }
  deletePost = async () => {
    try {
      await this.props.startDeletePost(this.props.post._id);
      this.props.history.push('/');
    } catch (e) {
      this.setState({error: e.message});
    }
  }
  render() {
    return (
      <div>
        {this.renderError()}
        <PostForm post={this.props.post} onSubmit={this.onSubmit} />
        <button className="btn-delete" onClick={this.deletePost}>Delete Post</button>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  post: state.posts.find(post => post._id === props.match.params.id)
});

const mapDispatchToProps = (dispatch) => ({
  startEditPost: (post, id) => dispatch(startEditPost(post, id)),
  startDeletePost: (id) => dispatch(startDeletePost(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditPostPage);