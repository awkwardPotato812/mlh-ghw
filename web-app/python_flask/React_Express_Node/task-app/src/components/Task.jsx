import React, { useState } from 'react';
import { navigate } from '@reach/router';
import axios from 'axios';

import './task.css';


function Task({ id, taskTitle, tags, deadline, cardColor, status }) {
    const compatCardStyles = {
        width: '300px',
        margin: '75px',
        borderRadius: "5px",
        padding: '5px',
        backgroundColor: cardColor,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '2px 2px 4px rgba(131, 139, 167, 0.6)'
    };

    const isArchived = status === 'ARCHIVED';

    const handleDeleteClick = () => {
        const deleteTask = async() => {
            const response = await axios.get( 'http://localhost:5000/delete/' + id );
            if ( response.status === 200 ) {
                console.debug( "Delete action succeeded" );
                window.location.reload();
            }
            else if ( response.status === 500 ) {
                console.error( "Delete action failed due to internal server error" );
                navigate( `/interalerror` );
            } else {
                console.error( "Delete action failed due to other error: " + response.status );
                navigate( `/notfound` );
            }
        }
        deleteTask();
    };

    const handleEditClick = () => {
        navigate( `/edit`, { state: {
                taskName: taskTitle,
                tags: tags,
                deadline: deadline,
                status: status,
                id: id,
            } 
        } );
    };

    const [ isExpanded, setExpanded ] = useState( false );

    return (
        <div>
            {!isExpanded && <div className="task-card-compact" style={ compatCardStyles }>
                <div className='card-header-compact'>
                    <h2>{ taskTitle }</h2>
                </div>
                <div className='card-body-compact'>
                    <div className='card-section-compact'>
                        <h3> Due on: { deadline }</h3>
                    </div>
                </div>
                <div className='card-footer-compact'>
                    { !isArchived && <span className="buttons">
                        <button className='icon-button' onClick={ handleEditClick }>
                            <img src={ process.env.PUBLIC_URL + 'icons8-edit-16.png' } />
                        </button>
                        <button className='icon-button' onClick={ handleDeleteClick }>
                            <img src={ process.env.PUBLIC_URL + 'icons8-delete-16.png' } />
                        </button>
                    </span>
                    }
                </div>
            </div>
            }
        </div>
    );
}

export default Task;