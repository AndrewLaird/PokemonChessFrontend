import React, { useState, useEffect } from 'react';
import { ChessState } from '../utils/chess_structs';
import axios from 'axios';
import Chessboard from './Chessboard';
import './Game.css';

async function fetchChessBoard(session_name: string) : Promise<ChessState> {
  const response = await axios.get("http://localhost:3000/start", {
    params: {
      name: session_name,
    },
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return response.data;
}

function Game() {
  const [chessState, setChessState] = useState<ChessState | null>(null);

  useEffect(() => {
    // This function will fetch the chess board data when the component mounts
    async function loadChessBoard() {
      try {
        const default_chess_state = await fetchChessBoard("test");
        setChessState(default_chess_state);
      } catch (error) {
        console.error("Failed to fetch chess board", error);
      }
    }

    loadChessBoard();
  }, []); // Empty dependency array means this useEffect runs once when component mounts



  return (
    <div className="game-container">
      <div className="chessboard">
        <h1>Chess</h1>
        <div>{chessState && <Chessboard chessState={chessState} />}</div>
      </div>
    </div>
  );
}

export default Game;
