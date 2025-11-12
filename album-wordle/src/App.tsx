import './App.css';
import GameBoard from './components/GameBoard';
import Header from './components/Header';
import { useState, useEffect } from 'react';
import Keyboard from './components/Keyboard';

function App() {

  return (
    <div className="App">
      <Header />
      <GameBoard />
      <Keyboard />
    </div>
  );
}

export default App;
