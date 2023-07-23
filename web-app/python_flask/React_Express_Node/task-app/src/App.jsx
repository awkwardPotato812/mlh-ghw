import React from 'react';
import { Router, Route } from '@reach/router';

import AddTaskPage from './AddTaskPage';
import LandingPage from './LandingPage';


const NotFound = () => {
  <center>
    <h1>Sorry, nothing found!</h1>
  </center>
};

const App = () => {
  return(
    <div>
      <Router>
        <LandingPage path="/" />
        <AddTaskPage path="/add" />
        <NotFound default />
      </Router>
    </div>
  );
};

export default App;
