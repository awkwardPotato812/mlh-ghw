import React from 'react';
import { Router } from '@reach/router';

import KanbanBoard from './components/KanbanBoard';
import TaskBar from './components/TaskBar';
import AddTaskForm from './components/AddTaskForm';
import EditTaskForm from './components/EditTaskForm';
import ArchivedTasks from './components/ArchivedTasks';


const DefaultError = () => {
  return (
    <center>
      <h1 style={{ color: '#cdd6f4' }}>Sorry, nothing here to see!</h1>
    </center>
  );
};

const InternalError = () => {
  return(
    <center>
      <h1 style={{ color: '#cdd6f4' }}>Sorry, the action could not be completed due to an internal error!</h1>
    </center>
  );
};

const App = () => {
  return(
    <div style={{ display: "flex", height: "100vh", backgroundColor: '#313244', borderRadius: '10px' }}>
      <TaskBar defaultstyle={{ flex: 1 }} defaultBgColor='#313244' />
      <div style={{ flex: 9 }}>
      <Router>
        <KanbanBoard path="/" />
        <AddTaskForm path="/add" />
        <EditTaskForm path="/edit" />
        <ArchivedTasks path="/archived" />
        <InternalError path="/internalerror" />
        <DefaultError default />
      </Router>
      </div>
    </div>
  );
};

export default App;
