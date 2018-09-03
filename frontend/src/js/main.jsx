import React from 'react';

import {Route, Switch} from 'react-router-dom';

import Home from './pages/home';
import StoreProfile from './containers/storeprofile';


export default function Main() {
    return (
        <Switch>
            <Route exact path="/" render={() => <Home />}/>
            <Route exact path="/profile/" render={() => <StoreProfile />}/>
        </Switch>
    );
}
