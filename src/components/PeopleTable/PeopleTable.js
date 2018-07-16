import React, { Component } from 'react';
import { connect } from 'react-redux';
import { moduleName, fetchAllPeople, peopleListSelector } from '../../ducks/people';
import { Table, Column } from 'react-virtualized';
import 'react-virtualized/styles.css';

export class PeopleTable extends Component {

    componentDidMount() {
        this.props.fetchAllPeople && this.props.fetchAllPeople();
    }
    
    render() { 
        const {people} = this.props;
        return (
            <Table
                rowCount={people.length}
                rowGetter={this.rowGetter}
                rowHeight={40}
                headerHeight={50}
                overscanRowCount={2}
                width={750}
                height={300}
                rowClassName="test--people-list__row"
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
}), {fetchAllPeople})(PeopleTable);