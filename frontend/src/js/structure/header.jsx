import React from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

import {Box, Heading} from 'rebass';

import Menu from './menu';


function HeaderComponent(props) {
    return (
        <Box>
            <Heading sx={{fontSize: 6, my: 4}}>Template project</Heading>
            {props.user &&
            <Menu user={props.user} />
            }
        </Box>
    );
}


const mapStateToProps = state => {
    return {
        user: state.user
    };
};


const Header = withRouter(connect(
    mapStateToProps,
    null
)(HeaderComponent));


export default Header;
