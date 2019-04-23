/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

//import rootReducer from './reducers/index';
import App from './components/app';
//import './styles/app.scss';

// const store = createStore(
//   rootReducer,
//   applyMiddleware(thunk),
// );

ReactDOM.render(
  //<Provider store={store}>
  <h1>Hello World</h1>
  <Provider>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('react-app'),
);
