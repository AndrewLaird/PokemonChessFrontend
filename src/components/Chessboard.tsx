// ChessBoard.tsx
import React, { useState } from 'react';
import { ChessState, Move, Piece, InteractionType, Player } from '../utils/chess_structs';
import './Chessboard.css';
import Piece_Component from './Piece';

interface ChessBoardProps {
  chessState: ChessState;
  onPieceClick: (row: number, col: number) => void;
  makeMove: (move: Move) => void; // new prop for making a move
  validMoves: Move[];
}

function getTypeInterationColor(typeInteraction: InteractionType| undefined): string {
  switch(typeInteraction) {
    case InteractionType.SuperEffective: return "highlight-attack-super-effective";
    case InteractionType.Normal: return "highlight-attack";
    case InteractionType.NotVeryEffective: return "highlight-attack-not-very-effective";
    case InteractionType.NoEffect: return "highlight-attack-no-effect";
    default: return "";
  }

}

function getSquareColor(row: number, col: number, validMoves: Move[]): string {
  const validMove = validMoves.find(move => move.to_row === row && move.to_col === col);
  const baseClass = (row + col) % 2 === 0 ? "white-square" : "black-square";
  if(validMove === undefined) {
    return baseClass;
  }
  const isAttack = validMove.capture !== null;
  console.log(validMove);
  if(isAttack) {
    if(validMove.type_interaction === null) {
      return `${baseClass} ${"highlight-attack"}`;
    }
    return `${baseClass} ${getTypeInterationColor(validMove.type_interaction)}`;
  }
  return `${baseClass} ${"highlight-move"}`;
}


const ChessBoard: React.FC<ChessBoardProps> = ({ chessState, onPieceClick, makeMove, validMoves }) => {

  const handleSquareClick = (row: number, col: number) => {
    const validMove = validMoves.find(move => move.to_row === row && move.to_col === col);

    if (validMove) {
      // If a piece is selected and the move is valid, make the move and reset the selected piece
      makeMove(validMove);
    } else {
      // If no piece is selected or the move isn't valid, just handle it as a regular piece click
      onPieceClick(row, col);
    }
  };

  return (
    <div className="chess-board">
      {[...chessState.chessboard.board].reverse().map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((piece, colIndex) => (
            <div 
              key={colIndex} 
              className={`board-square ${getSquareColor(7 - rowIndex, colIndex, validMoves)}`} 
              onClick={() => handleSquareClick(7 - rowIndex, colIndex)}
            >
              <Piece_Component 
                piece={piece} 
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ChessBoard;
