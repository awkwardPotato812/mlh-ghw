import React, { useState } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';

import './task-form.css'


function TaskForm( { defTaskName, defTags, defStatus, defDeadline, url } ) {
    const [ taskName, setTaskName ] = useState( defTaskName );
    const [ tags, setTags ] = useState( defTags );
    const [ status, setStatus ] = useState( defStatus );
    const [ deadline, setDeadline ] = useState( defDeadline );

    const isDone = status === "DONE";

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Perform actions with the form data
        // 1 - Use axios to forward things to flask app
        axios.post( url, {
            taskName: taskName,
            tags: tags,
            status: status,
            deadline: deadline
        } ).then( function ( response ) {
            if ( response.status === 200 ) {
                console.debug( "Successfully added task" );
                navigate( `/` );
            } else if ( response.status === 500 ) {
                console.error( "Unable to add new task due to internal server failure " );
                navigate( `/internalerror` );
            } else {
                console.error( "Unable to add new task due to error: " + response.status );
                navigate( `/notfound` );
            }
        } ).catch( function ( error ) {
            console.log( error );
            navigate( `/notfound` );
        });
    };

    return (
        <div className="form-body" onSubmit={ handleFormSubmit }>
            <div className="box-root flex-flex flex-direction--column" style={{ minHeight: '100vh', flexGrow: 1 }}>
                <div className="loginbackground padding-top--64">
                    <div className="loginbackground-gridContainer">
                        <div className="box-root flex-flex" style={{ gridArea: 'top / start / 8 / end' }}>
                            <div className="box-root" style={{ backgroundImage: 'linear-gradient(#313244 0%, rgb(49, 50, 68) 33%),',  flexGrow: 1}}></div>
                        </div>
                        <div className="box-root flex-flex" style={{ gridArea: '4 / 2 / auto / 5', backgroundColor: '#cdd6f4' }}>
                            <div className="box-root box-divider--light-all-2 animationLeftRight tans3s" style={{ flexGrow: 1 }}></div>
                        </div>
                        <div className="box-root flex-flex" style={{ gridArea: '6 / start / auto / 2' }}>
                            <div className="box-root box-background--blue800" style={{ flexGrow: 1 }}></div>
                        </div>
                        <div className="box-root flex-flex" style={{ gridArea: '7 / start / auto / 4' }}>
                            <div className="box-root box-background--blue animationLeftRight" style={{ flexGrow: 1 }}></div>
                        </div>
                        <div className="box-root flex-flex" style={{ gridArea: '8 / 4 / auto / 6' }}>
                            <div className="box-root box-background--gray100 animationLeftRight tans3s" style={{ flexGrow: 1 }}></div>
                        </div>
                        <div className="box-root flex-flex" style={{ gridArea: '2 / 15 / auto / end' }}>
                            <div className="box-root box-background--cyan200 animationRightLeft tans4s" style={{ flexGrow: 1 }}></div>
                        </div>
                        <div className="box-root flex-flex" style={{ gridArea: '3 / 14 / auto / end' }}>
                            <div className="box-root box-background--blue animationRightLeft" style={{ flexGrow: 1 }}></div>
                        </div>
                        <div className="box-root flex-flex" style={{ gridArea: '4 / 17 / auto / 20' }}>
                            <div className="box-root box-background--gray100 animationRightLeft tans4s" style={{ flexGrow: 1 }}></div>
                        </div>
                        <div className="box-root flex-flex" style={{ gridArea: '5 / 14 / auto / 17' }}>
                            <div className="box-root box-divider--light-all-2 animationRightLeft tans3s" style={{ flexGrow: 1 }}></div>
                        </div>
                    </div>
                </div>
                <div className="box-root padding-top--24 flex-flex flex-direction--column" style={{ flexGrow: 1,  zIndex: 9, position: 'initial' }}>
                    <div className="box-root padding-top--48 padding-bottom--24 flex-flex flex-justifyContent--center"></div>
                    <div className="formbg-outer">
                        <div className="formbg">
                            <div className="formbg-inner padding-horizontal--48">
                                <span className="padding-bottom--15">Add task</span>
                                <form id="stripe-login">
                                    <div className="field padding-bottom--24">
                                        <label for="taskName">Task Name</label>
                                        <input type="text" name="text" onChange={ ( e ) => { setTaskName( e.target.value ) } } value={ taskName }/>
                                    </div>
                                    <div className="field padding-bottom--24">
                                        <label for="tags">Task tags (. separated strings )</label>
                                        <input type="text" name="text" onChange={ ( e ) => { setTags( e.target.value ) } } value={ tags }/>
                                    </div>
                                    <div className="field padding-bottom--24">
                                        <label for="deadline">Due by</label>
                                        <input  type="datetime-local"  value={ deadline }
                                                onChange={ ( e ) => setDeadline( e.target.value ) } />
                                    </div>
                                    <div className="field padding-bottom--24">
                                        <label for="email">Status</label>
                                        <select id="dropdown" name="dropdown" value={ status } onChange={ ( e ) => { setStatus( e.target.value ) } }>
                                            <option value="INBOX">Inbox</option>
                                            <option value="INPROGRESS">In Progress</option>
                                            <option value="DONE">Done</option>
                                            {isDone && <option value="ARCHIVED">Archived</option>}
                                        </select>
                                    </div>
                                    <div className="field padding-bottom--24">
                                        <input type="submit" name="submit" value="Continue" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TaskForm;