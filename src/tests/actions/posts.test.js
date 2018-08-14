import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import 'jest-localstorage-mock';

import { 
  setPosts,
  startSetPosts,
  addPost,
  startAddPost,
  editPost,
  startEditPost,
  deletePost,
  startDeletePost,
  addComment,
  startAddComment
} from '../../actions/posts';
import posts from '../fixtures/posts';

const createMockStore = configureMockStore([thunk]);

beforeEach(() => {
  moxios.install();
  const auth = {
    token: '123abc456xyz'
  };
  localStorage.clear();
  localStorage.setItem('auth', JSON.stringify(auth));
});

afterEach(() => {
  moxios.uninstall();
});

test('should set up setPosts object', () => {
  const action = setPosts(posts);
  expect(action).toEqual({
    type: 'SET_POSTS',
    posts
  });
});

test('should  call setPosts if no errors', (done) => { 
  moxios.wait(() => {
    let request = moxios.requests.mostRecent();
    request.respondWith({
      status: 200,
      response: {posts}
    });
  })

  const store = createMockStore({}); 
  return store.dispatch(startSetPosts()).then(() => {
    const expectedActions = {
      type: 'SET_POSTS',
      posts
    }
    expect(store.getActions()).toEqual([expectedActions]);
    done();
  })
});

test('should not call setPosts if there are errors', (done) => { 
  moxios.wait(() => {
    let request = moxios.requests.mostRecent();
    request.respondWith({
      status: 400,
      response: {error: 'Post could not be retrieved.'}
    });
  })

  const store = createMockStore({}); 
  return store.dispatch(startSetPosts()).catch(() => {
    expect(store.getActions()).toEqual([]);
    done();
  });
});

test('should set up addPost object', () => {
  const action = addPost(posts[0]);
  expect(action).toEqual({
    type: 'ADD_POST',
    post: posts[0]
  });
});

test('should call addPost if no errors', (done) => {
  const auth = {
    token: '123abc456xyz'
  };
  localStorage.setItem('auth', JSON.stringify(auth));

  moxios.wait(() => {
    let request = moxios.requests.mostRecent();
    request.respondWith({
      status: 200,
      response: {
        post: posts[1]
      }
    });
  });

  const store = createMockStore({});
  return store.dispatch(startAddPost(posts[1])).then(() => {
    const expectedActions = {
      type: 'ADD_POST',
      post: posts[1]
    }
    expect(store.getActions()).toEqual([expectedActions]);
    done();
  });
});

test('should not call addPost if there are errors', (done) => {  
  moxios.wait(() => {
    let request = moxios.requests.mostRecent();
    request.respondWith({
      status: 400,
      response: {
        error: 'Could not add post.'
      }
    });
  });

  const store = createMockStore({});
  return store.dispatch(startAddPost(posts[1])).catch(() => {
    expect(store.getActions()).toEqual([]);
    done();
  });
});

test('should set up editPost object', () => {
  const updates = {
    title: 'New title',
    body: 'New post body.'
  }
  const action = editPost(updates);
  expect(action).toEqual({
    type: 'EDIT_POST',
    updates
  });
});

test('should call editPost if no errors', (done) => {
  moxios.wait(() => {
    let request = moxios.requests.mostRecent();
    request.respondWith({
      status: 200,
      response: { post: posts[1] }
    });
  });

  const store = createMockStore({});
  return store.dispatch(startEditPost(posts[1], posts[1]._id)).then(() => {
    const expectedActions = {
      type: 'EDIT_POST',
      updates: posts[1]
    };
    expect(store.getActions()).toEqual([expectedActions]);
    done();
  });
});

test('should not call editPost if there are errors', (done) => {
  moxios.wait(() => {
    let request = moxios.requests.mostRecent();
    request.respondWith({
      status: 400,
      response: { error: 'Could not update post.' }
    });
  });

  const store = createMockStore({});
  return store.dispatch(startEditPost(posts[1], posts[1]._id)).catch(() => {
    expect(store.getActions()).toEqual([]);
    done();
  });
});

test('should set up deletePost object', () => {
  const action = deletePost(posts[0]._id);
  expect(action).toEqual({
    type: 'DELETE_POST',
    id: posts[0]._id
  });
});

test('should call deletePost if no errors', (done) => {
  moxios.wait(() => {
    let request = moxios.requests.mostRecent();
    request.respondWith({
      status: 200,
      response: { message: 'Post successfully deleted.' }
    });
  });

  const store = createMockStore({});
  return store.dispatch(startDeletePost(posts[1]._id)).then(() => {
    const expectedActions = {
      type: 'DELETE_POST',
      id: posts[1]._id
    };
    expect(store.getActions()).toEqual([expectedActions]);
    done();
  });
});

test('should not call deletePost if there are errors', (done) => {
  moxios.wait(() => {
    let request = moxios.requests.mostRecent();
    request.respondWith({
      status: 400,
      response: { message: 'Could not delete post.' }
    });
  });

  const store = createMockStore({});
  return store.dispatch(startDeletePost(posts[1]._id)).catch(() => {
    expect(store.getActions()).toEqual([]);
    done();
  });
});

test('should set up addComment object', () => {
  const comment = {
    "_id" : "4b62cde562105f402c9a8746",
    "comment" : "A Comment",
    "createdBy" : "user",
    "date" : 1533201893553.0
  };
  const action = addComment(posts[1]._id, comment);
  expect(action).toEqual({
    type: 'ADD_COMMENT',
    id: posts[1]._id,
    comment
  });
});

test('should call addComment if no errors', (done) => {
  const comment = {
    "_id" : "4b62cde562105f402c9a8746",
    "comment" : "A Comment",
    "createdBy" : "user",
    "date" : 1533201893553.0
  };
  moxios.wait(() => {
    let request = moxios.requests.mostRecent();
    request.respondWith({
      status: 200,
      response: comment 
    });
  });

  const store = createMockStore({});
  return store.dispatch(startAddComment(posts[1]._id, comment)).then(() => {
    const expectedActions = {
      type: 'ADD_COMMENT',
      id: posts[1]._id,
      comment
    };
    expect(store.getActions()).toEqual([expectedActions]);
    done();
  });
});

test('should not call addComment if there are errors', (done) => {
  const comment = {
    "_id" : "4b62cde562105f402c9a8746",
    "comment" : "A Comment",
    "createdBy" : "user",
    "date" : 1533201893553.0
  };
  moxios.wait(() => {
    let request = moxios.requests.mostRecent();
    request.respondWith({
      status: 400,
      response: {error: 'Could not add comment.'} 
    });
  });

  const store = createMockStore({});
  return store.dispatch(startAddComment(posts[1]._id, comment)).catch(() => {
    expect(store.getActions()).toEqual([]);
    done();
  });
});
