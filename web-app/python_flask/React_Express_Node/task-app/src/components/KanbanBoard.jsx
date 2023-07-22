import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './Column';

function KanbanBoard() {
    //const [inbox, setInbox] = useState([]);
    //const [inProgress, setInProgress] = useState([]);
    //const [completed, setCompleted] = useState([]);

    return (
        <DragDropContext>
            <h2 style={{textAlign: "center" }} >Task Board</h2>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "row"
                }}
            >
                <Column id={"1"} title={"Inbox"} />
            </div>
        </DragDropContext>
    )
}

export default KanbanBoard;

