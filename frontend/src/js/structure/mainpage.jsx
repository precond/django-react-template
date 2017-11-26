import React from 'react';

import {Route, Switch} from 'react-router-dom';

import 'bootstrap';
import '../../css/app';

import Content from './content';
import Header from './header';
import Home from './home';


export default function MainPage(props) {
    return (
        <div>
            <Header user={props.user} />
            <Content>
                <Switch>
                    <Route exact path="/" render={() => <Home />}/>
                </Switch>
            </Content>
        </div>
    );
}
