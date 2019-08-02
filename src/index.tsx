import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'

import { reducer } from './reduxStore/reducer'
import { logger, middleware } from './reduxStore/middleware';
import thunk from 'redux-thunk';

const store = createStore(reducer, applyMiddleware(thunk, logger, middleware));

store.dispatch({
    type: 'INIT'
})

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
