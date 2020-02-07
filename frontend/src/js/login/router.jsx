import React from 'react';

import {Route, Switch} from 'react-router-dom';

import LoginContainer from './login-container';


export default function LoginRoutes() {
    return (
        <Switch>
            <Route exact path='/login/' render={() => <LoginContainer />}/>
        </Switch>
    );
}
