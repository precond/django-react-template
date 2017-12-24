import React from 'react';
import {render} from 'react-dom';

import {createStore} from 'redux';
import {Provider} from 'react-redux';

import {BrowserRouter as Router} from 'react-router-dom';

import {coreApp, initialState} from './reducers';

import '../css/app';

import Main from './main';


// Construct the store with combined initial state and preloaded state from backend
const preloadedState = window.__INITIAL_STATE__;
delete window.__INITIAL_STATE__;
const store = createStore(coreApp, Object.assign(initialState, preloadedState));


render(
    <Provider store={store}>
        <Router>
            <Main/>
        </Router>
    </Provider>,
    document.getElementById('app')
);
