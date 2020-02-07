import React from 'react';

import {Box, Heading} from 'rebass';

import Menu from './menu';


export default function Header(props) {
    return (
        <Box>
            <Heading sx={{fontSize: 6, my: 4}}>Template project</Heading>
            {props.user &&
            <Menu user={props.user} />
            }
        </Box>
    );
}
