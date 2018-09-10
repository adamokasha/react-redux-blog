export const sortPostsByDate = postsArray => {
  const newPostsArray = [].concat(postsArray);
  return newPostsArray.sort((a, b) => {
    if (a.createdAt > b.createdAt) {
      return -1;
    }
    if (a.createdAt < b.createdAt) {
      return 1;
    }
  });
};

export const sortCommentsByDate = commentsArray => {
  const newCommentsArray = [].concat(commentsArray);
  return newCommentsArray.sort((a, b) => {
    if (a.createdAt > b.createdAt) {
      return -1;
    }
    if (a.createdAt < b.createdAt) {
      return 1;
    }
  });
};
