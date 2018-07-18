import React, { Component } from 'react';
import VirtualizedEventList from '../../components/VirtualizedEventList/VirtualizedEventList';
import Trash from '../Trash/Trash';

class EventsPage extends Component {

    render() { 
        return (
            <div>
                <h1>Events Page</h1>
                <VirtualizedEventList />
                <Trash />
            </div>
        );
    }
}
 
export default EventsPage;