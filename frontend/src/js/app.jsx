import React from 'react';
import {render} from 'react-dom';

import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';

import thunk from 'redux-thunk';

import {BrowserRouter as Router} from 'react-router-dom';

import {coreApp, initialState} from './reducers';

import '../css/app';

import Main from './main';


// Construct the store with combined initial state and preloaded state from backend
const preloadedState = JSON.parse(document.getElementById('initial-state').textContent);
const store = createStore(
    coreApp,
    Object.assign(initialState, preloadedState),
    applyMiddleware(thunk)
);


render(
    <Provider store={store}>
        <Router>
            <Main/>
        </Router>
    </Provider>,
    document.getElementById('app')
);
