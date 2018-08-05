import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import postsReducer from '../reducers/posts';
import authReducer from '../reducers/auth';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
  posts: postsReducer,
  auth: authReducer
});

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;