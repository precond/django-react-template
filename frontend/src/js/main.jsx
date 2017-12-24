import React from 'react';

import {Route, Switch} from 'react-router-dom';

import Home from './pages/home';
import Profile from './pages/profile';


export default function Main() {
    return (
        <Switch>
            <Route exact path="/" render={() => <Home />}/>
            <Route exact path="/profile/" render={() => <Profile />}/>
        </Switch>
    );
}
