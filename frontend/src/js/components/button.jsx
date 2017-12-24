import React from 'react';

import {Link} from 'react-router-dom';


export const Button = function(props) {
    const type = props.type ? props.type : 'default';
    return(
        <div className={`col-lg-${props.size} col-md-${props.size} col-sm-${props.size} col-xs-12`}>
            {props.link && !props.disabled && <Link to={props.link} onClick={props.onClick}><button className={`btn btn-${type} btn-block${props.disabled ? ' disabled' : ''}`}>{props.children}</button></Link>}
            {(!props.link || props.disabled) && <button onClick={props.onClick} className={`btn btn-${type} btn-block${props.disabled ? ' disabled' : ''}`}>{props.children}</button>}
        </div>
    );
};
