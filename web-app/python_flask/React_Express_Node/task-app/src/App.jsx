import React from 'react';
import { styled } from 'styled-components';

import TaskBar from './components/TaskBar';


function App() {
  const bgColor = '#ffffff';
  return(
    <div style={{ display: "flex", height: "100vh", backgroundColor: {bgColor} }}>
        <TaskBar defaultBgColor={bgColor} style={{ flex: 1}}/>
      <div style={{ flex: 9}}>

      </div>
    </div>
  );
}

export default App;
