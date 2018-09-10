const postsReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_POSTS":
      return action.posts;
    case "ADD_POST":
      return [...state, action.post];
    case "EDIT_POST":
      return state.map(post => {
        if (post._id === action.updates._id) {
          return { ...post, ...action.updates };
        } else {
          return post;
        }
      });
    case "ADD_COMMENT":
      return state.map(post => {
        if (post._id === action.id) {
          return {
            ...post,
            comments: [...post.comments, action.comment]
          };
        } else {
          return post;
        }
      });
    case "DELETE_POST":
      return state.filter(post => {
        if (post._id !== action.id) {
          return post;
        }
      });
    default:
      return state;
  }
};

export default postsReducer;
