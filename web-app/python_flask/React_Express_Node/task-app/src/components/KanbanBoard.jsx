import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Task from './Task';
import Column from './Column';

function KanbanBoard() {
    //const [inbox, setInbox] = useState([]);
    //const [inProgress, setInProgress] = useState([]);
    //const [completed, setCompleted] = useState([]);

    return (
        <div>
            <h1 style={{textAlign: "center", color: '#cdd6f4' }} > Task Board</h1>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "row"
                }}
            >
                <Task taskTitle='Task 1' taskDetails='Dummy details' createDate='today' deadline='tomorrow' />
                <Column title='Inbox' /> 
                <Column title='In Progress' />
            <Column title='Done' />
            </div>
        </div>
        
    )
}

export default KanbanBoard;

