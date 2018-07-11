import React, { Component } from 'react';
import AddPersonForm from '../AddPersonForm/AddPersonForm';
import { addNewPerson } from '../../ducks/people';
import { connect } from 'react-redux';

class PersonPage extends Component {
    render() { 
        return (
            <div>
                <h2>Add new person</h2>
                <AddPersonForm onSubmit={this.props.addNewPerson} />
            </div>
        );
    }
}
 
export default connect(null, {addNewPerson})(PersonPage);