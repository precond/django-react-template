import React from 'react';

import {InputComponent, InputField} from '../components/inputs';
import {Button} from '../components/button';


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
            <div className='content'>
                <h2>Log in</h2>
                <InputField name="username" type="text" placeholder="Email address" onChange={this.inputChange} onBlur={this.inputBlur} />
                <InputField name="password" type="password" placeholder="Password" onChange={this.inputChange} onBlur={this.inputBlur} />
                {this.state.login_error &&
                <div className="error">Login failed</div>
                }
                <Button onClick={() => this.login()}>Login</Button>
            </div>
        );
    }
}
