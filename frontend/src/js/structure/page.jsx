import React from 'react';

import Content from './content';
import UserHeader from '../containers/userheader';


export default function Page(props) {
    return (
        <div>
            <UserHeader/>
            <Content>
                {props.children}
            </Content>
        </div>
    );
}
