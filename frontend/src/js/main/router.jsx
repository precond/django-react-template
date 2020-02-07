import React from 'react';

import {Route, Switch} from 'react-router-dom';

import Home from './home';
import ProfileContainer from './profile-container';


export default function MainRoutes() {
    return (
        <Switch>
            <Route exact path="/" render={() => <Home />}/>
            <Route exact path="/profile/" render={() => <ProfileContainer />}/>
        </Switch>
    );
}
