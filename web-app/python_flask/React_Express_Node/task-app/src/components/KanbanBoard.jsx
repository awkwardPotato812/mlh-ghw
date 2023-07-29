import React, { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import axios from 'axios';
import { navigate } from '@reach/router';

import Column from './Column';

function KanbanBoard() {
    const [ inbox, setInbox ] = useState( [] );
    const [ inProgress, setInProgress ] = useState( [] );
    const [ completed, setCompleted ] = useState( [] );

    useEffect( () => {
        const fetchTasks = async() => {
            try {
                console.debug( "Fetching tasks from backend server" );
                const response = await axios.get( 'http://localhost:5000/' );
                if ( response.status === 200 ) {
                    console.debug( "/: GET - Success" );
                    setInbox( response.data.inbox );
                    setInProgress( response.data.inProgress );
                    setCompleted( response.data.completed );
                } else if ( response.status === 500 ) {
                    console.error( "/: GET - Failed due to internal server error" );
                    navigate( `/internalerror` );
                } else {
                    console.error( "/: GET - Failed due to error status code: " + response.status );
                    navigate( `/notfound` );
                }
            } catch ( err ) {
                console.error( err );
            }
        }
        fetchTasks();
    }, [] );


    const handleDragEnd = ( result ) => {
        const { source, destination } = result;

        // Dropping outside of the three columns is not allowed
        console.debug( result );
        if ( !destination ) return;
        // No action is required when dropping within the same column
        // For now, the order in which the task appears is not indicative of priority
        // This will change when priority feature is included!
        if( source.droppableId === destination.droppableId ) return;

        const updateTaskStatus = async( task, status ) => {
            const url = 'http://localhost:5000/edit/' + task.id;
            console.debug( url );
            axios.post( url, {
                taskName: task.taskName,
                tags: task.tags,
                status: status,
                deadline: task.deadline
            } ).then( function( response ) {
                // TODO: Handle this part a bit based on testing!
                if ( response.status === 200 ) {
                    console.debug( "Task status has been updated successfully" );
                } else if (response.status === 500) {
                    console.error( "Tasks status update failed due to internal server error" );
                    navigate( `/internalerror` );
                }
                else {
                    console.error( "Task status update failed due to error: " + response.status );
                    navigate( `/notfound` );
                }
            } ).catch( function( error ) {
                console.log( error );
                navigate( `/notfound` );
            }) ;
        }

        // In all other cases, we should do the following:
        // 1- Move the element to the correct column by updating the list
        const sourceItems = source.droppableId === "INBOX" ? inbox : (
            source.droppableId === "INPROGRESS"? inProgress : completed );
        const destinationItems = destination.droppableId === "INBOX" ? inbox : (
            destination.droppableId === "INPROGRESS"? inProgress : completed );

        const [ removed ] = sourceItems.splice( source.index, 1 );
        destinationItems.splice( destination.index, 0, removed );

        source.droppableId === "INBOX" ? setInbox( sourceItems ) : (
            source.droppableId === "INPROGRESS"? setInProgress( sourceItems ) : setCompleted( sourceItems ) );
        
        destination.droppableId === "INBOX" ? setInbox( destinationItems ) : (
            destination.droppableId === "INPROGRESS"? setInProgress( destinationItems ) : setCompleted( destinationItems ) );

        console.debug( inbox );
        console.debug( inProgress );
        console.debug( completed );
        
        // 2- Make an async call to update the status of the task item in the backend
        updateTaskStatus( removed, destination.droppableId );
    }

    return (
        <div>
            <h1 style={{ textAlign: "center", color: '#cdd6f4' }} > Task Board</h1>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "row"
                }}
            >
                <DragDropContext onDragEnd={ handleDragEnd }>
                    <Column title='Inbox'  id='INBOX' taskList={ inbox } cardColor='#f2cdcd' /> 
                    <Column title='In Progress' id='INPROGRESS' taskList={ inProgress } cardColor='#f9e2af'/>
                    <Column title='Done' id='DONE' taskList={ completed } cardColor='#94e2d5' />
                </DragDropContext>
            </div>
        </div>
        
    )
}

export default KanbanBoard;

