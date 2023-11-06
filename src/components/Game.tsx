import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ChessState, Move, Player } from '../utils/chess_structs';
import { getMoves, movePiece, getGameState } from '../utils/api_functions'; // ensure you import your API function for making a move
import Chessboard from './Chessboard';
import './Game.css';
import PokeballIndicator from './PokeballIndicator'
import MessageBanner from './MessageBanner';
// Importing the image
import PokemonTitle from '../assets/PokemonTitle.png';

function Game() {
  // Asserting that pokemon_name will be a string using 'as string'
  const { pokemon_name } = useParams() as { pokemon_name: string };
  const [chessState, setChessState] = useState<ChessState | null>(null);
  const [validMoves, setValidMoves] = useState<Move[]>([]);

  useEffect(() => {
    async function loadChessBoard() {
      try {
        if (!pokemon_name) {
          return;
        }
        const default_chess_state = await getGameState(pokemon_name);
        setChessState(default_chess_state);
      } catch (error) {
        console.error("Failed to fetch chess board", error);
      }
    }

    loadChessBoard();
  }, []);

  async function handlePieceClick(row: number, col: number){
    try {
      const moves = await getMoves(pokemon_name, row, col);
      setValidMoves(moves);
    } catch (error) {
      console.error("Failed to fetch valid moves", error);
    }
  }

  // Function to handle making a move
  async function handleMakeMove(move: Move) {
    try {
      // Assuming apiMakeMove sends a move to the server and returns the updated ChessState
      const updatedState = await movePiece(pokemon_name, move.from_row, move.from_col, move.to_row, move.to_col);
      setChessState(updatedState);
      setValidMoves([]); // Clear valid moves after a move has been made
    } catch (error) {
      console.error("Failed to make a move", error);
    }
  }

  return (
    <div className="game-container">
      <div className="scaling-container">
        <img className="chess-title" src={PokemonTitle} alt="Pokemon Chess" />
        {chessState && <MessageBanner chessState={chessState} />}
        {chessState && (
          <>
            <PokeballIndicator displayLeft={true} hidden={chessState.player == Player.White}/>
            <Chessboard 
              chessState={chessState} 
              onPieceClick={handlePieceClick} 
              makeMove={handleMakeMove}
              validMoves={validMoves} 
            />
            <PokeballIndicator displayLeft={false} hidden={chessState.player == Player.Black}/>
          </>
        )}
      </div>
    </div>
  );
}

export default Game;

