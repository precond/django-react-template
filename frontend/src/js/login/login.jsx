import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import {Box, Heading} from 'rebass';

import {getAPI} from './api';

import {InputComponent, InputField} from '../components/inputs';
import {Button} from '../components/button';
import Page from '../structure/page';


class LoginComponent extends InputComponent {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            login_error: false,
        };
    }

    login() {
        this.props.api.login(this.state.username, this.state.password)
            .then(() => window.location.assign(this.props.next))
            .catch(() => this.setState({login_error: true}));
    }

    render() {
        return (
            <Page>
                <Box as='form' sx={{mx: 'auto', width: '300px'}} onSubmit={e => e.preventDefault()}>
                    <Heading sx={{mt: 4, mb: 2}}>Log in</Heading>
                    <InputField variant="slab" name="username" type="text" placeholder="Email address" onChange={this.inputChange} onBlur={this.inputBlur} />
                    <InputField variant="slab" name="password" type="password" placeholder="Password" onChange={this.inputChange} onBlur={this.inputBlur} />
                    {this.state.login_error &&
                    <Box sx={{color: 'highlight', fontSize: 2}}>Login failed</Box>
                    }
                    <Button sx={{mt: 3, width: '100%'}} onClick={() => this.login()}>Login</Button>
                </Box>
            </Page>
        );
    }
}


const mapStateToProps = state => {
    return {
        next: state.next
    };
};


const mapDispatchToProps = dispatch => {
    return {
        api: getAPI(dispatch)
    };
};


const Login = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginComponent));


export default Login;
