import React from 'react';

import DjangoRESTComponent from '../util/django';


const PasswordField = function(props) {
    return(
        <div className="form-group col-md-3">
            <label className="control-label">{props.text}</label>
            <input name={props.name} className="form-control" type="password" onChange={props.handler}/>
        </div>
    );
};


export default class Profile extends DjangoRESTComponent {
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
        self.post('/me/password/', {
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
            <div>
                <h2>User profile</h2>
                <h3>Change password</h3>
                <form>
                    <div className="row">
                        <PasswordField name="currentPassword" text="Current password" handler={this.inputChange}/>
                        <PasswordField name="newPassword" text="New password" handler={this.inputChange}/>
                        <PasswordField name="newPasswordAgain" text="New password, again" handler={this.inputChange}/>
                        <div className="form-group col-md-1">
                            <label className="control-label">&nbsp;</label>
                            <button className="btn btn-default" onClick={this.changePassword}>Change</button>
                        </div>
                    </div>
                </form>
                {this.state.message &&
                    <div className={`alert alert-${this.state.success ? 'success' : 'danger'} col-md-3`}>
                        <strong>{this.state.message}</strong>
                    </div>
                }
            </div>
        );
    }
}
