import React from 'react';

import {Input as RebassInput, Label as RebassLabel, Radio, Select as RebassSelect, Textarea} from '@rebass/forms';


export const InputLabel = function(props) {
    return(
        <RebassLabel {...props}>
            {props.children}{props.required && <sup>*</sup>}
        </RebassLabel>
    );
};


export const InputField = function(props) {
    return(
        <>
            <RebassInput {...props} className={props.error ? ' has-error' : ''} ref={props.refCallback} />
            {props.error && <span className="validation-error">{props.error}</span>}
        </>
    );
};


export const TextareaField = function(props) {
    return(
        <>
            <Textarea {...props} className={props.error ? ' has-error' : ''} ref={props.refCallback} />
            {props.error && <span className="validation-error">{props.error}</span>}
        </>
    );
};


export const SelectField = function(props) {
    return(
        <>
            <RebassSelect {...props} className={props.error ? ' has-error' : ''} value={props.selectedValue}>
                {props.children}
            </RebassSelect>
            {props.error && <span className="validation-error">{props.error}</span>}
        </>
    );
};


export const Options = function(props) {
    return props.options.map((option) =>
        <option key={option.value} value={option.value}>{option.text}</option>
    );
};


export const RadioButton = function(props) {
    return(
        <RebassLabel sx={props.sx}>
            <Radio name={props.name} id={props.id} value={props.value} checked={props.value === props.selectedValue} onChange={props.onChange} />
            {props.children}
        </RebassLabel>
    );
};


export const Checkbox = function(props) {
    return(
        <div className="checkbox">
            <input type="checkbox" name={props.name} id={props.id} value={props.value} checked={props.value} onChange={props.onChange} />
            <RebassLabel htmlFor={props.id} className={props.textClass}>{props.children}</RebassLabel>
        </div>
    );
};


export class InputComponent extends React.Component {
    constructor(props) {
        super(props);
        this.inputChange = this.inputChange.bind(this);
        this.inputBlur = this.inputBlur.bind(this);
        this.hasErrors = this.hasErrors.bind(this);
        this.save = this.save.bind(this);
        this.validateAndSave = this.validateAndSave.bind(this);
    }


    /**
     * Update local state with the user's input
     */
    inputChange(e) {
        const name = e.target.name;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        if (e.target.type === 'select-one') {
            this.setState({
                [name]: value,
                [`${name}_text`]: e.target.options[e.target.selectedIndex].text
            });
        } else {
            this.setState({
                [name]: value
            });
        }

        if (e.target.type === 'checkbox' || e.target.type === 'radio') {
            this.validateField(name, value);
        }
    }


    /**
     * Runs field validation when the user exits an input field. Validation in the
     * inputChange() method would run it on every keystroke, so inputChange() validates
     * only clickable fields (checkboxes, radio buttons).
     */
    inputBlur(e) {
        const name = e.target.name;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        this.validateField(name, value);
    }


    /**
     * Checks if the current error object in the local state has an error for
     * any of its keys.
     */
    hasErrors() {
        let found = false;
        for (let key of Object.keys(this.state.errors)) {
            if (this.state.errors[key]) {
                found = true;
                break;
            }
        }
        return found;
    }


    /**
     * Validate the given field and set the result into the error object in local state.
     */
    validateField(name, value) {
        const error = this.doValidateField(name, value);
        this.setState((prevState) => {
            // If returned error is an object (supposedly containing errors
            // for multiple fields), merge it with the existing errors in state
            if (error !== null && typeof error === 'object') {
                return {
                    errors: {
                        ...prevState.errors,
                        ...error
                    }
                };
            }

            // Otherwise associate the error with the current field name
            return {
                errors: {
                    ...prevState.errors,
                    [name]: error
                }
            };
        });

        return error;
    }


    /**
     * Implement this method in the derived component to validate the whole page. Should
     * call validateField() for the individual fields and return false if validation of
     * any field did not pass.
     */
    validatePage() {
        // Default implementation always passes
        return true;
    }


    /**
     * Implement this method in the derived component to perform the given field validation.
     * Receives field name and value as arguments, the implementation can for example do
     * the validation in a switch-case construct. Return null if no error, the error message
     * as a string for a single field, or an object of {<field1>: <msg1>, <field2: msg2> ... }
     * if validation created errors for multiple fields.
     */
    doValidateField() {
        return null;
    }


    /**
     * Save the edited values from local state into store
     */
    save() {
        this.props.onSave(this.state);
    }


    /**
     * First validate and if succeeds, save the local state into store
     */
    validateAndSave() {
        if (this.validatePage()) {
            this.props.onSave(this.state);
        }
    }
}
