import React, { Component } from 'react';
import { connect } from 'react-redux';
import { moduleName, fetchAllPeople, peopleListSelector } from '../../ducks/people';
import { Table, Column } from 'react-virtualized';
import 'react-virtualized/styles.css';
import { TransitionMotion, spring } from 'react-motion';

export class PeopleTable extends Component {

    componentDidUpdate({people}) {
        if (people.length && this.props.people.length > people.length) {
            setTimeout(() => {
                this.table.scrollToRow(this.props.people.length)
            }, 0);
        }
    }

    componentDidMount() {
        this.props.fetchAllPeople && this.props.fetchAllPeople();
    }
    
    render() { 
        const {people} = this.props;
        if (!people.length) return null;
        return (
            <TransitionMotion
                willEnter={this.willEnter}
                styles={this.getStyles}
            >
                {interpolatedStyles => 
                    <Table
                        rowCount={interpolatedStyles.length}
                        rowGetter={this.rowGetter}
                        rowHeight={40}
                        headerHeight={50}
                        overscanRowCount={2}
                        width={750}
                        height={300}
                        rowClassName="test--people-list__row"
                        rowStyle={({index}) => index < 0 ? {} : interpolatedStyles[index].style}
                        ref={this.setListRef}
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
                }
            </TransitionMotion>
        );
    }

    willEnter = () => ({
        opacity: 0
    });

    getStyles = () => this.props.people.map(person => ({
        key: person.uid,
        style: {
            opacity: spring(1, {stiffness: 50})
        },
        data: person
    }));

    setListRef = ref => this.table = ref;

    rowGetter = ({index}) => {
        return this.props.people[index];
    }
}
 
export default connect(state => ({
    people: peopleListSelector(state)
}), {fetchAllPeople})(PeopleTable);