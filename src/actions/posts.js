import axios from "axios";

export const setPosts = posts => ({
  type: "SET_POSTS",
  posts
});

export const startSetPosts = () => {
  return async dispatch => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/posts`
      );
      dispatch(setPosts(response.data.posts));
    } catch (e) {
      throw new Error("Could not retrieve posts...");
    }
  };
};

export const addPost = post => ({
  type: "ADD_POST",
  post
});

export const startAddPost = post => {
  return async dispatch => {
    const { token } = JSON.parse(localStorage.getItem("auth"));
    try {
      const response = await axios({
        url: `${process.env.REACT_APP_API_URL}/posts`,
        method: "post",
        headers: {
          "x-auth": token
        },
        data: post
      });

      dispatch(addPost(response.data.post));
    } catch (e) {
      throw new Error(e.response.data.error);
    }
  };
};

export const editPost = updates => ({
  type: "EDIT_POST",
  updates
});

export const startEditPost = (post, id) => {
  return async dispatch => {
    const { token } = JSON.parse(localStorage.getItem("auth"));
    try {
      const response = await axios({
        url: `${process.env.REACT_APP_API_URL}/posts/${id}`,
        method: "patch",
        headers: {
          "x-auth": token
        },
        data: post
      });

      dispatch(editPost(response.data.post));
    } catch (e) {
      throw new Error(e.response.data.error);
    }
  };
};

export const deletePost = id => ({
  type: "DELETE_POST",
  id
});

export const startDeletePost = id => {
  return async dispatch => {
    const { token } = JSON.parse(localStorage.getItem("auth"));
    try {
      const response = await axios({
        url: `${process.env.REACT_APP_API_URL}/posts/${id}/`,
        method: "delete",
        headers: {
          "x-auth": token
        }
      });

      dispatch(deletePost(id));
    } catch (e) {
      throw new Error(e.response.data.error);
    }
  };
};

export const addComment = (id, comment) => ({
  type: "ADD_COMMENT",
  id,
  comment
});

export const startAddComment = (id, comment) => {
  return async dispatch => {
    try {
      const { token } = JSON.parse(localStorage.getItem("auth"));
      const response = await axios({
        url: `${process.env.REACT_APP_API_URL}/posts/${id}/comments`,
        method: "post",
        headers: {
          "x-auth": token
        },
        data: {
          comment
        }
      });

      dispatch(addComment(id, response.data));
    } catch (e) {
      throw new Error(e.response.data.error);
    }
  };
};
