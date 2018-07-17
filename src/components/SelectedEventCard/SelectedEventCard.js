import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';

class SelectedEventCard extends Component {
    render() { 
        const {connectDropTarget, hovered, canDrop} = this.props;
        const {title, when, where} = this.props.event;

        const dropStyle = {
            border: `1px solid ${canDrop ? 'red' : 'black'}`,
            backgroundColor: hovered ? 'green' : 'white'
        }

        return connectDropTarget(
            <div style = {dropStyle}>
                <h3>{title}</h3>
                <p>{where}, {when}</p>
            </div>
        );
    }
}

const spec = {
    drop(props, monitor) {
        const personUid = monitor.getItem().uid;
        const eventUid = props.event.uid;

        console.log('======', 'event', eventUid);
        console.log('======', 'person', personUid);
    }
}

const collect = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    canDrop: monitor.canDrop(),
    hovered: monitor.isOver()
});
 
export default DropTarget('person', spec, collect)(SelectedEventCard);