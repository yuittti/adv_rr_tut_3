import React, { Component } from 'react';
import PeopleList from '../PeopleList/PeopleList';
import VirtualizedEventList from '../VirtualizedEventList/VirtualizedEventList';
import SelectedEvents from '../SelectedEvents/SelectedEvents';

class AdminPage extends Component {
    
    render() { 
        return (
            <div>
                <h1>Admin Page</h1>
                <PeopleList />
                <SelectedEvents />
                <VirtualizedEventList />
            </div>
        );
    }
}
 
export default AdminPage;