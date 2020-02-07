import React from 'react';
import {render} from 'react-dom';

import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';

import thunk from 'redux-thunk';

import {BrowserRouter as Router} from 'react-router-dom';

import {loginApp, initialState} from './login/reducers';

import '../css/app';
import { ThemeProvider } from 'theme-ui'
import theme from './theme'

import LoginRoutes from './login/router';


// Construct the store with combined initial state and preloaded state from backend
const preloadedState = JSON.parse(document.getElementById('initial-state').textContent);
const store = createStore(
    loginApp,
    Object.assign(initialState, preloadedState),
    applyMiddleware(thunk)
);


render(
    <ThemeProvider theme={theme}>
        <Provider store={store}>
            <Router>
                <LoginRoutes/>
            </Router>
        </Provider>
    </ThemeProvider>,
    document.getElementById('app')
);
