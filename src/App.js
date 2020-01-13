import React from 'react';
import Game from './Containers/Game';
import './App.css';

function App() {
  return (
    <div className="TicTacToeApp">
      <header>Play tic tac toe with your friend!</header>
      <Game />
    </div>
  );
}

export default App;
