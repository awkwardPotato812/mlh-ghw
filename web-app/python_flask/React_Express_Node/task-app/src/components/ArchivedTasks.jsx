import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';

import Task from './Task';
import './archived.css';


function ArchivedTasks() {
    const [ archived, setArchived ] = useState( [] );

    useEffect( () => {
        const fetchTasks = async() => {
            try {
                console.debug( "Fetching tasks from backend server" );
                const response = await axios.get( 'http://localhost:5000/archived' );
                if ( response.status === 200 ) {
                    console.debug( "/: GET - Success" );
                    console.debug( response )
                    setArchived( response.data.archived );
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

    return (
        <div className="card-gallery">
          { archived.map( ( task, index ) => (
            <Task id={ task.id } taskTitle={ task.taskName } tags={ task.tags } 
                deadline={ task.deadline } cardColor='#9399b2' status={ task.status } />
          ))}
        </div>
      );
}
export default ArchivedTasks;