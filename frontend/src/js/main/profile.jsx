import React from 'react';

import {InputField, InputComponent} from '../components/inputs';
import Page from '../structure/page';
import {Button} from '../components/button';


const PasswordField = function(props) {
    return(
        <InputField size={3} type="password" name={props.name} label={props.label} error={props.error} onChange={props.onChange} onBlur={props.onBlur}/>
    );
};


export default class Profile extends InputComponent {
    constructor(props) {
        super(props);
        this.state = {
            message: null,
            success: false,
            currentPassword: null,
            newPassword: null,
            newPasswordAgain: null,
            errors: {}
        };

        this.changePassword = this.changePassword.bind(this);
        this.canChangePassword = this.canChangePassword.bind(this);
    }


    canChangePassword() {
        return this.state.currentPassword && this.state.newPassword && this.state.newPasswordAgain && !this.hasErrors();
    }


    doValidateField(name, value) {
        let error = null;
        switch(name) {
        case 'currentPassword':
            if (!value) {
                error = 'Fill in current password';
            }
            break;
        case 'newPassword':
            if (!value) {
                error = 'Fill in new password';
            } else if (value.length < 7) {
                error = 'Password is too short';
            }
            break;
        case 'newPasswordAgain':
            if (value !== this.state.newPassword) {
                error = 'Passwords do not match';
            }
            break;
        }
        return error;
    }


    changePassword() {
        const self = this;
        this.props.api.setPassword(this.state.currentPassword, this.state.newPassword).then(function() {
            // On success render the success Bootstrap alert
            self.setState({
                message: 'Password changed!',
                success: true,
                currentPassword: null,
                newPassword: null,
                newPasswordAgain: null
            });

        }).catch(function(ex) {
            // On error render the failure Bootstrap alert with the error message
            self.setState({
                message: ex.message,
                success: false
            });
        });
    }


    render() {
        return (
            <Page>
                <h2>User profile</h2>
                <h3>Change password</h3>
                <div className="row">
                    <PasswordField name="currentPassword" label="Current password" error={this.state.errors.currentPassword} onChange={this.inputChange} onBlur={this.inputBlur}/>
                    <PasswordField name="newPassword" label="New password" error={this.state.errors.newPassword} onChange={this.inputChange} onBlur={this.inputBlur}/>
                    <PasswordField name="newPasswordAgain" label="New password, again" error={this.state.errors.newPasswordAgain} onChange={this.inputChange} onBlur={this.inputBlur}/>
                    <div className="form-group"><Button size={2} type="primary" disabled={!this.canChangePassword()} onClick={this.changePassword}>Change</Button></div>
                </div>
                {this.state.message &&
                    <div className={`alert alert-${this.state.success ? 'success' : 'danger'} col-md-3`}>
                        <strong>{this.state.message}</strong>
                    </div>
                }
            </Page>
        );
    }
}
