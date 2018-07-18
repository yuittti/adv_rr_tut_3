import React, { Component } from 'react';
import PeopleList from '../PeopleList/PeopleList';
import VirtualizedEventList from '../VirtualizedEventList/VirtualizedEventList';
import SelectedEvents from '../SelectedEvents/SelectedEvents';
import Trash from '../Trash/Trash';

class AdminPage extends Component {
    
    render() { 
        return (
            <div>
                <h1>Admin Page</h1>
                <PeopleList />
                <SelectedEvents />
                <VirtualizedEventList />
                <Trash />
            </div>
        );
    }
}
 
export default AdminPage;