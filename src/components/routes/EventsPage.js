import React, { Component } from 'react';
import VirtualizedEventList from '../../components/VirtualizedEventList/VirtualizedEventList';

class EventsPage extends Component {

    render() { 
        return (
            <div>
                <h1>Events Page</h1>
                <VirtualizedEventList />
            </div>
        );
    }
}
 
export default EventsPage;