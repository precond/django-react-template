import React from 'react';

import {Box, Heading} from 'rebass';

import Header from './header';


export default function Page(props) {
    return (
        <Box sx={{mx: 3}}>
            <Header/>
            <Box>
                {props.heading &&
                <Heading sx={{fontSize: 3, mt: 3}}>{props.heading}</Heading>
                }
                {props.children}
            </Box>
        </Box>
    );
}
