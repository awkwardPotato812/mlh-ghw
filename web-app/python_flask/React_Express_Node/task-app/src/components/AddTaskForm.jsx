import React, { useState } from 'react';

import TaskForm from './TaskForm';


function AddTaskForm() {
  return (
    <TaskForm defTaskName='' defTags='' defStatus='INBOX' defDeadline={ new Date().toLocaleString() } url='http://localhost:5000/add' />
  );
}

export default AddTaskForm;