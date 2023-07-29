import React, { useEffect } from 'react';
import { useLocation } from '@reach/router';

import TaskForm from './TaskForm';


function EditTaskForm() {
    const location = useLocation();
    const payload = location.state;
    // Access the payload data here
  return (
    <TaskForm defTaskName={ payload.taskName } defTags={ payload.tags }
    defStatus={ payload.status } defDeadline={ payload.deadline } url={ 'http://localhost:5000/edit/' + payload.id } />
  );
}

export default EditTaskForm;