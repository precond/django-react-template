import React from 'react';

import {Link} from 'react-router-dom';

import {Box, Button as RebassButton} from 'rebass';


export const Button = function(props) {
    return(
        <Box>
            {props.link && !props.disabled && <Link to={props.link} onClick={props.onClick}><RebassButton {...props}>{props.children}</RebassButton></Link>}
            {(!props.link || props.disabled) && <RebassButton {...props}>{props.children}</RebassButton>}
        </Box>
    );
};
