import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import {Box} from 'rebass';

import {getAPI} from './api';

import {Button} from '../components/button';
import {InputField, InputComponent, InputLabel} from '../components/inputs';
import Page from '../structure/page';


const PasswordField = function(props) {
    return(
        <div>
            <InputLabel htmlFor={props.id}>{props.label}</InputLabel>
            <InputField {...props} type="password"/>
        </div>
    );
};


class ProfileComponent extends InputComponent {
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
            <Page heading="User profile">
                <Box as="form" sx={{width: '700px'}} onSubmit={e => e.preventDefault()}>
                    <PasswordField id="pw_current" name="currentPassword" label="Current password" error={this.state.errors.currentPassword} onChange={this.inputChange} onBlur={this.inputBlur}/>
                    <PasswordField id="pw_new" name="newPassword" label="New password" error={this.state.errors.newPassword} onChange={this.inputChange} onBlur={this.inputBlur}/>
                    <PasswordField id="pw_new2" name="newPasswordAgain" label="New password, again" error={this.state.errors.newPasswordAgain} onChange={this.inputChange} onBlur={this.inputBlur}/>
                    <Button disabled={!this.canChangePassword()} onClick={this.changePassword}>Save</Button>
                </Box>
                {this.state.message &&
                    <div>
                        <strong>{this.state.message}</strong>
                    </div>
                }
            </Page>
        );
    }
}


const mapStateToProps = state => {
    return {
        user: state.user
    };
};


const mapDispatchToProps = dispatch => {
    return {
        api: getAPI(dispatch)
    };
};


const Profile = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileComponent));


export default Profile;
