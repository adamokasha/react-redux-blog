import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {startSetPosts} from '../actions/posts';
import {sortPostsByDate}  from '../selectors/posts';

// const PostsList = (props) => (
//   <div>
//     {props.posts.length >= 1 ? (
//       props.posts.map((post) => {
//         return (
//           <Link to={`posts/${post._id}`} key={post._id}>
//             <h3>{post.title}</h3>
//             <p>{post.body}</p>
//           </Link>
//         )
//       })
//     ) : (
//       <p>Loading...</p>
//     )}
//   </div>
// )

class PostsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: ''
    }
  }
  async componentDidMount() {
    try {
      if (this.props.posts.length === 0) {
        await this.props.startSetPosts();
      }
    } catch (e) {
      console.log(e.message);
      this.setState({error: e.message});
    }
  }
  handleFetchStatus = () => {
    if(this.state.error) {
      return (
        <p>{this.state.error}</p>
      )
    } else {
      return (
        <p>Fetching posts...</p>
      )
    }
  }
  render() {
    return (
      <div>
      {
        this.props.posts.length >= 1 ? (
        this.props.posts.map((post) => {
          return (
            <Link to={`posts/${post._id}`} key={post._id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </Link>
          )
        })
      ) : (
        this.handleFetchStatus()
      )
    }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  posts: sortPostsByDate(state.posts)
});

const mapDispatchToProps = (dispatch) => ({
  startSetPosts: () => dispatch(startSetPosts())
})

export default connect(mapStateToProps, mapDispatchToProps)(PostsList);