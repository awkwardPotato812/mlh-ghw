import React, { useState } from 'react';
import { Link } from '@reach/router';


function TaskBar( props ) {
    const linkStyles = {
        backgroundColor: '#7f849c',
        color: '#1e1e2e',
        width: '100px',
        textAlign: 'center',
        marginTop: '15px',
        marginBottom: '15px',
        padding: '15px',
        fontWeight: 'bold',
        textDecoration: 'none',
        borderRadius: '5px',
        boxShadow: '2px 2px 4px rgba(131, 139, 167, 0.6)'
    };

    const hoverStyles = {
        backgroundColor: '#11111b',
        color: '#cdd6f4',
        boxShadow: '0 0 2px rgba(0, 0, 0, 0.5)'
    };

    const handleMouseOver = ( event ) => {
        Object.assign( event.target.style, hoverStyles );
    };
    
    const handleMouseOut = ( event ) => {
        Object.assign( event.target.style, linkStyles );
    };

    const [ isOpen, setIsOpen ] = useState( false );
    const [ bgColor, setBgColor ] = useState( props.defaultBgColor );
    const handleClick= () => {
        setIsOpen( !isOpen );
        if( !isOpen ) {
            setBgColor( "#11111b" );
        } else {
            setBgColor( props.defaultBgColor );
        }
        
    };

    return (
        <div className='task-bar' style={{ backgroundColor: bgColor }} >
            <div className='task-bar-title' style={{ display: 'flex', padding: '5px' }}>
                <button onClick={ handleClick } style={{ backgroundColor: '#cdd6f4' }}>
                    <img alt='Menu' src={ process.env.PUBLIC_URL + 'icons8-menu-32.png' } />
                </button>
                <h2 style={{ color: '#cdd6f4', margin: '5px' }}>Task Bar</h2>
            </div>
            { isOpen && <div className='task-menu' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Link to="/add" style={ linkStyles } onMouseOver={ handleMouseOver } 
                        onMouseOut={ handleMouseOut }>Add Task</Link>
                <Link style={ linkStyles } onMouseOver={ handleMouseOver }
                    onMouseOut={ handleMouseOut } to="/archived" >Archived Task</Link>
            </div> 
            }
        </div>
    );
}

export default TaskBar;