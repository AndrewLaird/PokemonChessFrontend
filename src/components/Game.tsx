import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ChessState, Settings, Move, Player } from '../utils/chess_structs';
import { getMoves, movePiece, getGameState, selectPawnPromotionPiece, getPreviousState, getNextState } from '../utils/api_functions'; // ensure you import your API function for making a move
import Chessboard from './Chessboard';
import './Game.css';
import PokeballIndicator from './PokeballIndicator'
import MessageBanner from './MessageBanner';
// Importing the image
import PokemonTitle from '../assets/PokemonTitle.png';

function Game() {
  // Asserting that pokemon_name will be a string using 'as string'
  const { pokemon_name, player } = useParams() as { pokemon_name: string, player: string };
  const [chessState, setChessState] = useState<ChessState | null>(null);
  const [validMoves, setValidMoves] = useState<Move[]>([]);
  const isFlipped = player !== "black";

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

  async function handlePieceSelection(piece: string) {
    try {
      const updatedState = await selectPawnPromotionPiece(pokemon_name, piece);
      setChessState(updatedState);
    } catch (error) {
      console.error("Failed to select pawn promotion piece", error);
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
  
  // undo move
  async function undoMove() {
    try {
      const updatedState = await getPreviousState(pokemon_name);
      setChessState(updatedState);
    } catch (error) {
      console.error("Failed to fetch chess board", error);
    }
  }
  // redo move
  async function redoMove() {
    try {
      const updatedState = await getNextState(pokemon_name);
      setChessState(updatedState);
    } catch (error) {
      console.error("Failed to fetch chess board", error);
    }
  }

  return (
    <div className="game-container">
      <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      <div className="scaling-container">
        <img className="chess-title" src={PokemonTitle} alt="Pokemon Chess" />
        {chessState && <MessageBanner chessState={chessState} turn={chessState.turn_count} game_name={pokemon_name} />}
        {chessState && (
          <>
            <PokeballIndicator
            displayLeft={true} 
            hidden={isFlipped ? chessState.player === Player.White : chessState.player === Player.Black}
            />
            <Chessboard 
              chessState={chessState} 
              onPieceClick={handlePieceClick} 
              onPieceSelection={handlePieceSelection}
              makeMove={handleMakeMove}
              validMoves={validMoves} 
              isFlipped={player !== "black"}
            />
            <PokeballIndicator 
            displayLeft={false}
            hidden={isFlipped ? chessState.player === Player.Black : chessState.player === Player.White}
            />
            <div>
              <button className="undo-btn state-btn" onClick={undoMove}></button>
              <button className="redo-btn state-btn" onClick={redoMove}></button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Game;

