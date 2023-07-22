import React, { useState } from 'react';


function TaskBar(props) {
    const linkStyles = {
        backgroundColor: '#e5e8ec',
        color: '#060708',
        width: '120px',
        textAlign: 'center',
        margin: '15px',
        fontWeight: 'bold',
        textDecoration: 'none',
        borderRadius: '5px',
        boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
    };

    const hoverStyles = {
        backgroundColor: '#d6dae2',
        boxShadow: '0 0 2px rgba(0, 0, 0, 0.5)'
    };

    const handleMouseOver = (event) => {
        Object.assign(event.target.style, hoverStyles);
    };
    
    const handleMouseOut = (event) => {
        Object.assign(event.target.style, linkStyles);
    };

    const [isOpen, setIsOpen] = useState(false);
    const [bgColor, setBgColor] = useState(props.defaultBgColor);
    const handleClick= () => {
        setIsOpen(!isOpen);
        if(!isOpen) {
            setBgColor("#f4f5f7");
        } else {
            setBgColor(props.defaultBgColor);
        }
        
    };

    return (
        <div className='task-bar' style={{ backgroundColor: bgColor }} >
            <div className='task-bar-title'>
                <button onClick={handleClick}>
                    <img alt='Clipboard' src={process.env.PUBLIC_URL + 'favicon.ico'} />
                </button>
                <h1>Task Bar</h1>
            </div>
            {isOpen && <div className='task-menu' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <a style={linkStyles} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} href='https://google.com'>Add Task</a>
                <a style={linkStyles} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} href='https://google.com'>Archived Task</a>
            </div> }
        </div>
    );
}

export default TaskBar;