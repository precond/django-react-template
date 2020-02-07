import React from 'react';

import {Box, Heading} from 'rebass';

import {InputComponent, InputField} from '../components/inputs';
import {Button} from '../components/button';
import Page from '../structure/page';


export class Login extends InputComponent {
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
                    <InputField name="username" type="text" placeholder="Email address" onChange={this.inputChange} onBlur={this.inputBlur} />
                    <InputField name="password" type="password" placeholder="Password" onChange={this.inputChange} onBlur={this.inputBlur} />
                    {this.state.login_error &&
                    <Box sx={{color: 'highlight', fontSize: 2}}>Login failed</Box>
                    }
                    <Button sx={{mt: 3, width: '100%'}} onClick={() => this.login()}>Login</Button>
                </Box>
            </Page>
        );
    }
}
