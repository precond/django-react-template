import React from 'react';

import Menu from './menu';


export default function Header(props) {
    return (
        <div id="header">
            <h1>Template project</h1>
            <Menu user={props.user} />
        </div>
    );
}
