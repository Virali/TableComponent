import React from 'react';
import './App.css';
import JSONTextarea from './containers/JSONTextarea';
import LinkInput from './containers/LinkInput';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <LinkInput/>
        <JSONTextarea/>
      </header>
    </div>
  );
}

export default App;
