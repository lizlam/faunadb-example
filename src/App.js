import React from 'react'
import Orders from './Orders'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>An Exploration of Fauna, FQL and Netlify Functions</h1>
        <Orders />
      </header>
    </div>
  );
}

export default App
