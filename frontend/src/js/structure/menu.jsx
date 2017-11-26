import React from 'react';

import {Link} from 'react-router-dom';


function MenuLink (props) {
    const link = props.to ?
        <Link to={props.to}><span className={props.text_class}>{props.children}</span></Link> :
        <a target={props.target} href={props.url}><span className={props.text_class}>{props.children}</span></a>;

    return (
        <li className={props.item_class}>{link}</li>
    );
}


export default function Menu(props) {
    return (
        <nav className="navbar navbar-default" role="navigation">
            <div className="container-fluid">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".sidebar-navbar-collapse">
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                </div>
                <div className="navbar-collapse collapse sidebar-navbar-collapse">
                    <ul className="nav navbar-nav visible-xs">
                        <MenuLink to="/">Home</MenuLink>
                        <MenuLink url="/logout/" text_class="text-info">Logout</MenuLink>
                    </ul>
                    <ul className="nav navbar-nav hidden-xs">
                        <MenuLink to="/">Home</MenuLink>
                        {props.user.is_superuser && <MenuLink url="/admin/" text_class="text-danger" target="_blank">Admin</MenuLink>}
                        <MenuLink url="/logout/" text_class="text-info">Logout</MenuLink>
                    </ul>
                    <ul className="nav navbar-nav hidden-xs pull-right">
                        <MenuLink to="/profile/">Logged in as {props.user.first_name} {props.user.last_name}</MenuLink>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
