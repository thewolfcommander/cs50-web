import React from 'react';
import './App.css';
import TaskBoard from './Components/TaskBoard';
import NavMenu from './Components/NavMenu';

function App() {
  return (
    <div className="App">
      <NavMenu />
      <TaskBoard />
    </div>
  );
}

export default App;
