import React from 'react';

import {Box, Flex, Link as RebassLink} from 'rebass';
import {Link} from 'react-router-dom';


function MenuLink (props) {
    return props.to ?
        <RebassLink variant={props.variant} as="span"><Link {...props} style={{color: 'inherit', textDecoration: 'inherit'}}>{props.children}</Link></RebassLink> :
        <RebassLink {...props}>{props.children}</RebassLink>;
}


function Hamburger (props) {
    return (
        <Box {...props}>
            <Box sx={{height: '6px', width: '40px', mb: 2, bg: 'primary'}} />
            <Box sx={{height: '6px', width: '40px', mb: 2, bg: 'primary'}} />
            <Box sx={{height: '6px', width: '40px', mb: 2, bg: 'primary'}} />
        </Box>
    );
}


export default class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mobile_visible: false,
        };
    }

    render() {
        return (
            <>
                {this.state.mobile_visible &&
                <Box onClick={() => this.setState({mobile_visible: false})} variant="backdrop" />
                }
                {this.state.mobile_visible ? (
                    <Box onClick={() => this.setState({mobile_visible: false})} variant="mobilemenuopen" as="nav">
                        <MenuLink to='/' variant="mobilenav">Home</MenuLink>
                        {this.props.user.is_superuser &&
                        <MenuLink href="/admin/" target="_blank" variant="mobilenav">Admin</MenuLink>
                        }
                        <MenuLink to='/profile/' variant="mobilenav">Profile</MenuLink>
                        <MenuLink href="/logout/" variant="mobilenav">Logout</MenuLink>
                    </Box>
                ) : (
                    <Hamburger onClick={() => this.setState({mobile_visible: true})} variant="mobilemenu" as="nav" />
                )}
                <Flex variant="desktopmenu" as="nav">
                    <MenuLink to='/' variant="nav">Home</MenuLink>
                    <Box mx='auto'/>
                    {this.props.user.is_superuser &&
                    <MenuLink href="/admin/" target="_blank" variant="nav">Admin</MenuLink>
                    }
                    <MenuLink to='/profile/' variant="nav">Profile</MenuLink>
                    <MenuLink href="/logout/" variant="nav">Logout</MenuLink>
                </Flex>
            </>
        );
    }
}
