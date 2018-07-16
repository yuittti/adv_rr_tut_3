import React, { Component } from 'react';
import AddPersonForm from '../AddPersonForm/AddPersonForm';
import PeopleTable from '../PeopleTable/PeopleTable';
import { addPerson, moduleName } from '../../ducks/people';
import { connect } from 'react-redux';
import Loader from '../Loader/Loader';

class PersonPage extends Component {
    render() { 
        const {loading, addPerson} = this.props;
        return (
            <div>
                <h2>Add new person</h2>
                {loading 
                    ? <Loader />
                    : <AddPersonForm onSubmit={addPerson} />
                }
                <PeopleTable />
            </div>
        );
    }
}
 
export default connect(state => ({
    loading: state[moduleName].loading
}), {addPerson})(PersonPage);