import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import moment from 'moment';

import Header from './Header';
import CommentBox from './CommentBox';

export const PostItem = ({auth, post}) => {
  function renderEditButton() {
    if (auth.role === 'admin') {
      return (
        <Link to={`/posts/${post._id}/edit`} className="btn btn-dark btn-md float-right">
          <i className="far fa-edit"></i> Edit
        </Link>
      )
    }
  }
  return (
    <div>
      <Header />
        <div className="container">
          <div>
          {
            renderEditButton()
          }
          <h2>{post.title}</h2>
          <p className="text-muted">Posted by {post.author} on {moment(post.createdAt).format('MMMM Do YYYY')}.</p>
          <p>{post.body}</p>
          
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