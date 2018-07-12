import React, { Component } from 'react';
import AddPersonForm from '../AddPersonForm/AddPersonForm';
import { addPerson } from '../../ducks/people';
import { connect } from 'react-redux';

class PersonPage extends Component {
    render() { 
        return (
            <div>
                <h2>Add new person</h2>
                <AddPersonForm onSubmit={this.props.addPerson} />
            </div>
        );
    }
}
 
export default connect(null, {addPerson})(PersonPage);