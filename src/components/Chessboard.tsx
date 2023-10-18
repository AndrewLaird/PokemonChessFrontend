import React from 'react';
import { ChessState, ChessPieceType, Piece } from '../utils/chess_structs';
import './Chessboard.css';

interface ChessBoardProps {
  chessState: ChessState;
}

// This function can convert a ChessPieceType into a string or Unicode chess character.
function getPieceSymbol(piece: Piece): string {
  // convert the piece_type to a piece_type 
  let piece_type = piece.piece_type as ChessPieceType;


  switch (piece_type) {
    case ChessPieceType.WhitePawn: return '♙';
    case ChessPieceType.WhiteKnight: return '♘';
    case ChessPieceType.WhiteBishop: return '♗';
    case ChessPieceType.WhiteRook: return '♖';
    case ChessPieceType.WhiteQueen: return '♕';
    case ChessPieceType.WhiteKing: return '♔';
    case ChessPieceType.BlackPawn: return '♟︎';
    case ChessPieceType.BlackKnight: return '♞';
    case ChessPieceType.BlackBishop: return '♝';
    case ChessPieceType.BlackRook: return '♜';
    case ChessPieceType.BlackQueen: return '♛';
    case ChessPieceType.BlackKing: return '♚';
    default: return '';
  }
}

const ChessBoard: React.FC<ChessBoardProps> = ({ chessState }) => {
  return (
    <div className="chess-board">
      {chessState.chessboard.board.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((piece, colIndex) => (
            <div key={colIndex} className="board-square">
              {getPieceSymbol(piece)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ChessBoard;

