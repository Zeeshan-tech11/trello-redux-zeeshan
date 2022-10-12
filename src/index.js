import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createStore ,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { boardReducer } from './reducers';
import {Provider} from 'react-redux'
const store=createStore(boardReducer,applyMiddleware(thunk));
console.log(store);
store.subscribe(()=>console.log('state',store.getState()));
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
);


