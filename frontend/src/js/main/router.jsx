import React from 'react';

import {Route, Switch} from 'react-router-dom';

import Home from './home';
import Profile from './profile';


export default function MainRoutes() {
    return (
        <Switch>
            <Route exact path="/" render={() => <Home />}/>
            <Route exact path="/profile/" render={() => <Profile />}/>
        </Switch>
    );
}
