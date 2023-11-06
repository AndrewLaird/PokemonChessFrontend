// Piece.tsx
import React from 'react';
import { Piece as ChessPiece, ChessPieceType } from '../utils/chess_structs';
import './Piece.css';

interface PieceProps {
  piece: ChessPiece;
}

const Piece_Component: React.FC<PieceProps> = ({ piece }) => {
  function getPieceSymbol(piece: ChessPiece): string {
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

  return (
    <div className="piece"> 
      {getPieceSymbol(piece)}
      {piece.piece_type != ChessPieceType.Empty && (<div className={`piece-type-description ${piece.pokemon_type}`}>{piece.pokemon_type}</div>)}
    </div>
  );
};

export default Piece_Component;

