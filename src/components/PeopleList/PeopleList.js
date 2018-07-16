import React, { Component } from 'react';
import { connect } from 'react-redux';
import { moduleName, fetchAllPeople, peopleListSelector } from '../../ducks/people';
import { Table, Column } from 'react-virtualized';
import 'react-virtualized/styles.css';

class PeopleList extends Component {

    componentDidMount() {
        this.props.fetchAllPeople();
    }
    
    render() { 
        const {people} = this.props;
        console.log(people)
        return (
            <Table
                rowCount={people.length}
                rowGetter={this.rowGetter}
                rowHeight={40}
                headerHeight={50}
                overscanRowCount={5}
                width={750}
                height={300}
            >
                <Column
                    label="firstName"
                    dataKey="firstName"
                    width={250} />
                <Column
                    label="lastName"
                    dataKey="lastName"
                    width={250} />
                <Column label="email"
                    dataKey="email"
                    width={250} />
            </Table>
        );
    }

    rowGetter = ({index}) => {
        return this.props.people[index];
    }
}
 
export default connect(state => ({
    people: peopleListSelector(state)
}), {fetchAllPeople})(PeopleList);