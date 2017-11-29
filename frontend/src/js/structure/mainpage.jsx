import React from 'react';

import {Route, Switch} from 'react-router-dom';

import 'bootstrap';
import '../../css/app';

import Content from './content';
import Header from './header';
import Home from './home';
import Profile from './profile';


export default function MainPage(props) {
    return (
        <div>
            <Header user={props.user} />
            <Content>
                <Switch>
                    <Route exact path="/" render={() => <Home />}/>
                    <Route exact path="/profile/" render={() => <Profile />}/>
                </Switch>
            </Content>
        </div>
    );
}
