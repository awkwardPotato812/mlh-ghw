import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import './column.css'
import Task from './Task';

function Column({ title, id, taskList, cardColor }) {
    const containerStyles = {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#11111b',
        borderRadius: '10px',
        width: '450px',
        height: '80vh',
        margin: '20px',
        overflowY: 'auto',
        scrollbarWidth: 'thin',
        scrollbarColor: '#bac2de #a6adc8',
    };


    const titleStyles = {
        padding: '8px',
        color: '#a6adc8',
        position: 'stick',
        textAlign: 'center'
    };

    return(
        <div className="scrollable-container" style={containerStyles} >
            <h2 style={titleStyles} >{title} </h2>
            <Droppable droppableId={id} isDropDisabled={false} >
                { (provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} style={{ flexGrow: 1 }} >
                        { taskList.map((task, index) => (
                            <Draggable key={task.id} draggableId={task.id.toString()} index={index} >
                                    {(provided) => (
                                        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} >
                                            <Task id={task.id} taskTitle={task.taskName} tags={task.tags}
                                                  deadline={task.deadline} cardColor={cardColor} status={task.status} />
                                        </div>
                                    )}
                            </Draggable>
                        ))}
                    {provided. placeholder} 
                    </div>
                )}
            </Droppable>
        </div>
    )
}

export default Column;