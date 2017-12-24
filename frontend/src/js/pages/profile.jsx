import React from 'react';

import {InputField, InputPage} from '../components/inputs';
import Page from '../structure/page';
import DjangoAPI from '../util/django';
import {Button} from '../components/button';


const PasswordField = function(props) {
    return(
        <InputField size={3} type="password" name={props.name} label={props.label} onChange={props.onChange}/>
    );
};


export default class Profile extends InputPage {
    constructor(props) {
        super(props);
        this.state = {
            message: null,
            success: false
        };

        this.changePassword = this.changePassword.bind(this);
    }


    changePassword(e) {
        const self = this;
        e.preventDefault();
        DjangoAPI.post('/me/password/', {
            password_current: this.state.currentPassword,
            password_new: this.state.newPassword,
            password_again: this.state.newPasswordAgain

        }).then(function() {
            // On success render the success Bootstrap alert
            self.setState({
                message: 'Password changed!',
                success: true,
                password_current: null,
                password_new: null,
                password_again: null
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
                <form>
                    <div className="row">
                        <PasswordField name="currentPassword" label="Current password" onChange={this.inputChange}/>
                        <PasswordField name="newPassword" label="New password" onChange={this.inputChange}/>
                        <PasswordField name="newPasswordAgain" label="New password, again" onChange={this.inputChange}/>
                        <div className="form-group"><Button size={1} onClick={this.changePassword}>Change</Button></div>
                    </div>
                </form>
                {this.state.message &&
                    <div className={`alert alert-${this.state.success ? 'success' : 'danger'} col-md-3`}>
                        <strong>{this.state.message}</strong>
                    </div>
                }
            </Page>
        );
    }
}
