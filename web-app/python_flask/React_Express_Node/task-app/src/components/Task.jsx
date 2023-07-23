import React, { useState } from 'react';

function Task({ taskTitle, taskDetails, createDate, deadline }) {
    const contentStyles = {
        overflowWrap: 'break-word',
        color: '#232634',
        padding: '5px',
    };
    
    const h3Styles = {
        color: '#232634'
    };

    const compatCardStyles = {
        width: '300px',
        borderRadius: "5px",
        backgroundColor: "#838ba7",
        display: 'flex',
        flexDirection: 'column',
    };

    const expandedCardStyles = {

    };

    const [isExpanded, setExpanded] = useState(false);
    const handleClick = () => {
        setExpanded(!isExpanded)
    }
    return (
        <div className="task-card">
            {!isExpanded && <div className='card-content' 
                style={compatCardStyles}>
                <div style={{ borderRadius: '10px', backgroundColor: '#a5adce' }}>
                    <h2 style={contentStyles} >{taskTitle}</h2>
                    <hr style={{ color: '#232634', borderWidth: '1px' }} />
                    <h3 style={contentStyles} > Due on: {deadline}</h3>
                </div>
                <p>{createDate}</p>
            </div>
            }
        </div>
    );
}

export default Task;