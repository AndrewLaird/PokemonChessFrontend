import React from 'react';
import './SelectPromotionPiecePopup.css'; // Assuming you have a CSS file for styling
import { Player, ChessPieceType } from '../utils/chess_structs';

interface SelectPromotionPiecePopupProps {
  isOpen: boolean;
  onPieceSelection: (piece: string) => void;
  color?: Player;
}

const SelectPromotionPiecePopup: React.FC<SelectPromotionPiecePopupProps> = ({ isOpen, onPieceSelection, color = Player.White }) => {

  const handlePieceSelection = (piece: string) => {
    // will make the api call to promote the pawn to the selected piece
    onPieceSelection(piece);
  };

  function getPieceSymbol(pieceType: ChessPieceType): string {
    switch (pieceType) {
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

  const pieceColor = color === Player.White ? 'White' : 'Black';

  return (
    <div className="promotion-popup" style={{ display: isOpen ? 'block' : 'none' }}>
      <h2>Select Promotion Piece</h2>
      <div className="promotion-options">
        <button onClick={() => handlePieceSelection('Queen')}>
          {getPieceSymbol(ChessPieceType[`${pieceColor}Queen`])}
        </button>
        <button onClick={() => handlePieceSelection('Rook')}>
          {getPieceSymbol(ChessPieceType[`${pieceColor}Rook`])}
        </button>
        <button onClick={() => handlePieceSelection('Bishop')}>
          {getPieceSymbol(ChessPieceType[`${pieceColor}Bishop`])}
        </button>
        <button onClick={() => handlePieceSelection('Knight')}>
          {getPieceSymbol(ChessPieceType[`${pieceColor}Knight`])}
        </button>
      </div>
    </div>
  );
};

export default SelectPromotionPiecePopup;
