import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Game from './components/Game';
import Home from './components/Home';
import './App.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:pokemon_name/:player?" element={<Game />} />
      </Routes>
    </Router>
  );
}

export default App;
