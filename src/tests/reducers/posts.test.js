import postsReducer from '../../reducers/posts';
import posts from '../fixtures/posts';

test('should set default state', () => {
  const state = postsReducer(undefined, {type: '@@INIT'});
  expect(state).toEqual([]);
});

test('should set posts', () => {
  const action = {
    type: 'SET_POSTS',
    posts
  }
  const state = postsReducer(undefined, action)
  expect(state).toEqual(posts);
});


test('should add a new post', () => {
  const newPost = {
    "_id" : "5h62er83edprme893d8a0bef2",
    "author" : "new_user",
    "category" : "React",
    "title" : "A post about react",
    "body" : "This is the third post.The body has at least 24 characters.",
    "createdAt" : 1533201289999.0,
    "comments" : [],
  }
  const action = {
    type: 'ADD_POST',
    post: newPost
  }
  const state = postsReducer(posts, action)
  expect(state).toEqual([...posts, newPost]);
});

test('should edit an existing post', () => {
  const editedPost = {
    "_id" : "5b62cb86efcae617d8a0bef8",
    "author" : "UserTwo",
    "category" : "EDITED",
    "title" : "This is an edited post",
    "body" : "This is the second post.It has been edited.",
    "createdAt" : 1533201286279.0,
    "comments" : [],
  }
  const action = {
    type: 'EDIT_POST',
    updates: editedPost
  }
  const state = postsReducer(posts, action)
  expect(state).toEqual([posts[0], editedPost]);
});

test('should add a comment to a post', () => {
  const action = {
    type: 'ADD_COMMENT',
    id: posts[1]._id,
    comment: 'A brilliant comment'
  };
  const state = postsReducer(posts, action);
  expect(state[1].comments.length).toBe(1);
});

test('should delete a post', () => {
  const action = {
    type: 'DELETE_POST',
    id: posts[1]._id
  }
  const state = postsReducer(posts, action);
  expect(state.length).toBe(1);
});