import React from 'react';

import {Route, Switch} from 'react-router-dom';

import Login from './login';


export default function LoginRoutes() {
    return (
        <Switch>
            <Route exact path='/login/' render={() => <Login />}/>
        </Switch>
    );
}
