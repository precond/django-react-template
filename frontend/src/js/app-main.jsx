import React from 'react';
import {render} from 'react-dom';

import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';

import thunk from 'redux-thunk';

import {BrowserRouter as Router} from 'react-router-dom';

import {coreApp, initialState} from './main/reducers';

import '../css/app';

import MainRoutes from './main/router';


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
            <MainRoutes/>
        </Router>
    </Provider>,
    document.getElementById('app')
);
