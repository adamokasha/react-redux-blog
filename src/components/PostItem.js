import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import moment from 'moment';

import Header from './Header';
import CommentBox from './CommentBox';

const PostItem = ({auth, post}) => {
  function renderEditButton() {
    if (auth.role === 'admin') {
      return (
        <Link to={`/posts/${post._id}/edit`}>
          <button>Edit</button>
        </Link>
      )
    }
  }
  return (
    <div>
      <Header />
        <div>
          <div>
          <h3>{post.title}</h3>
          <p>Posted by {post.author} on {moment(post.createdAt).format('MMMM Do YYYY')}.</p>
          <p>{post.body}</p>
          {
            renderEditButton()
          }
        </div>
        <CommentBox id={post._id} comments={post.comments}/>
      </div>
    </div>
)}

const mapStateToProps = (state, props) => ({
  auth: state.auth,
  post: state.posts.find(post => post._id === props.match.params.id)
});

export default connect(mapStateToProps, null)(PostItem);