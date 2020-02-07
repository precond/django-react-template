import React from 'react';

import {Box, Flex, Link as RebassLink} from 'rebass';

import Link from 'react-router-dom/Link';


function MenuLink (props) {
    return props.to ?
        <RebassLink variant="nav" as="span"><Link {...props} style={{color: 'inherit', textDecoration: 'inherit'}}>{props.children}</Link></RebassLink> :
        <RebassLink variant="nav" {...props}>{props.children}</RebassLink>;
}


export default function Menu(props) {
    return (
        <Flex px={2} color='white' bg='black' alignItems='center'>
            <MenuLink to='/'>Home</MenuLink>
            {props.user.is_superuser &&
            <MenuLink href="/admin/" target="_blank">Admin</MenuLink>
            }
            <Box mx='auto' />
            <MenuLink to='/profile/'>Profile</MenuLink>
            <MenuLink href="/logout/">Logout</MenuLink>
        </Flex>
    );
}
