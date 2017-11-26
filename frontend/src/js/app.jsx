import React from 'react';
import {render} from 'react-dom';

import {createStore} from 'redux';
import {Provider} from 'react-redux';

import {BrowserRouter as Router} from 'react-router-dom';

import {coreApp} from './reducers';
import UserMainPage from './containers/usermainpage';

import Promise from 'promise-polyfill';

import '../css/app';


// Add Promises polyfill if not provided by the browser
if (!window.Promise) {
    window.Promise = Promise;
}


const preloadedState = window.__INITIAL_STATE__;
delete window.__INITIAL_STATE__;
const store = createStore(coreApp, preloadedState);


function App() {
    return (<UserMainPage />);
}


render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById('app')
);
