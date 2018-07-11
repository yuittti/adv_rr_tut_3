import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import ErrorField from '../ErrorField/ErrorField';
import emailValidator from 'email-validator';

class AddPersonForm extends Component {
    
    render() { 
        const {handleSubmit} = this.props;
        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <Field name="firstName" component={ErrorField} />
                    <Field name="lastName" component={ErrorField} />
                    <Field name="email" component={ErrorField} />
                    <div>
                        <input type="submit" />
                    </div>
                </form>
            </div>
        );
    }
}

const validate = ({firstName, lastName, email}) => {
    const errors = {};

    if (!firstName) errors.firstName = 'First name is required';
    else if (firstName.length < 3) errors.firstName = 'First name is too short';

    if (!lastName) errors.lastName = 'Last name is required';
    else if (lastName.length < 3) errors.lastName = 'Last name is too short';

    if (!email) errors.email = 'email is required';
    else if (!emailValidator.validate(email)) errors.email = 'invalid email';

    return errors;
}
 
export default reduxForm({
    form: 'add',
    validate
})(AddPersonForm);