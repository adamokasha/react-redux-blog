import React from 'react';
import {connect} from 'react-redux';

import PostForm from './PostForm';
import {startAddPost} from '../actions/posts';

class AddPostForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: ''
    }
  }
  renderError = () => {
    if(this.state.error) {
      return (
        <div>
          <p>{this.state.error}</p>
        </div>
      )
    }
  }
  onSubmit = async (post) => {
    try {
     await this.props.startAddPost(post);
     this.props.history.push('/');
    } catch (e) {
      this.setState({error: e.message});
    }
  }
  render() {
    return (
      <div>
        {this.renderError()}
        <PostForm onSubmit={this.onSubmit}/>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  startAddPost: (post) => dispatch(startAddPost(post))
});

export default connect(null, mapDispatchToProps)(AddPostForm);

