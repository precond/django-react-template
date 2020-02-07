import React from 'react';

import {Box, Heading} from 'rebass';

import UserHeader from './userheader';


export default function Page(props) {
    return (
        <Box sx={{mx: 3}}>
            <UserHeader/>
            <Box>
                {props.heading &&
                <Heading sx={{fontSize: 3, mt: 3}}>{props.heading}</Heading>
                }
                {props.children}
            </Box>
        </Box>
    );
}
