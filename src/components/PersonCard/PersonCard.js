import React, { Component } from 'react';

class PersonCard extends Component {
    
    render() { 
        const {person, style} = this.props;
        return (
            <div style={{...style, width: 200, height: 100}}>
                <h3>{person.firstName}&nbsp;{person.lastName}</h3>
                <p>{person.email}</p>
            </div>
        );
    }
}
 
export default PersonCard;