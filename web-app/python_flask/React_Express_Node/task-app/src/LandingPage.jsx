import React from 'react';

import TaskBar from './components/TaskBar';
import KanbanBoard from './components/KanbanBoard';

const LandingPage = () => {
    return (
        <div style={{ display: "flex", height: "100vh", backgroundColor: '#313244', borderRadius: '10px' }}>
            <TaskBar defaultstyle={{ flex: 1}} defaultBgColor='#313244' />
            <div style={{ flex: 9}}>
                <KanbanBoard />
            </div>
        </div>
    );
};

export default LandingPage;


