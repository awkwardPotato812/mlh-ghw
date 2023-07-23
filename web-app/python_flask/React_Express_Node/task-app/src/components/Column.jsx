import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import './column.css'

function Column({ title }) {
    const containerStyles = {
        backgroundColor: '#c6d0f5',
        borderRadius: '10px',
        width: '500px',
        height: '80vh',
        margin: '20px',
        overflowY: 'scroll',
        scrollbarWidth: 'thin',
        scrollbarColor: '#bac2de #a6adc8'
    };

    const titleStyles = {
        padding: '8px',
        color: '#181825',
        position: 'stick',
        textAlign: 'center'
    };

    return(
        <div className="scrollable-container" style={containerStyles} >
            <h2 style={titleStyles} >{title} </h2>
        </div>
    )
}

export default Column;