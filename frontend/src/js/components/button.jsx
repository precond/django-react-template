import React from 'react';

import {Link} from 'react-router-dom';


export const Button = function(props) {
    return(
        <div>
            {props.link && !props.disabled && <Link to={props.link} onClick={props.onClick}><button disabled={props.disabled}>{props.children}</button></Link>}
            {(!props.link || props.disabled) && <button onClick={props.onClick} disabled={props.disabled} type={props.type}>{props.children}</button>}
        </div>
    );
};
