import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';

import AppRouter from "./routers/AppRouter";
import store from './store/configureStore';

// import {startSetPosts} from './actions/posts';

const unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)

// store.dispatch(startSetPosts());

const App = () => (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(<App />, document.getElementById("app"));
