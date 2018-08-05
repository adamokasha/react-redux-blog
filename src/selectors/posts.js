export const sortPostsByDate = (postsArray) => {
  return postsArray.sort((a,b) => {
    if(a.createdAt > b.createdAt) {
      return -1;
    }
    if (a.createdAt < b.createdAt) {
      return 1;
    }
  })
}

export const sortCommentsByDate = (commentsArray) => {
  return commentsArray.sort((a,b) => {
    if(a.createdAt < b.createdAt) {
      return -1;
    }
    if (a.createdAt > b.createdAt) {
      return 1;
    }
  })
}