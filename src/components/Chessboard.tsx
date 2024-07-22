import React from "react";
import { ChessState, Move, InteractionType } from "../utils/chess_structs";
import "./Chessboard.css";
import Piece_Component from "./Piece";
import SelectPromotionPiecePopup from "./SelectPromotionPiecePopup";

interface ChessBoardProps {
  chessState: ChessState;
  onPieceClick: (row: number, col: number) => void;
  makeMove: (move: Move) => void;
  onPieceSelection: (piece: string) => void;
  validMoves: Move[];
  isFlipped: boolean; // New prop to determine if the board should be flipped
}

function getTypeInterationColor(
  typeInteraction: InteractionType | undefined,
): string {
  switch (typeInteraction) {
    case InteractionType.SuperEffective:
      return "highlight-attack-super-effective";
    case InteractionType.Normal:
      return "highlight-attack";
    case InteractionType.NotVeryEffective:
      return "highlight-attack-not-very-effective";
    case InteractionType.NoEffect:
      return "highlight-attack-no-effect";
    default:
      return "";
  }
}

function getSquareColor(row: number, col: number, validMoves: Move[]): string {
  const validMove = validMoves.find(
    (move) => move.to_row === row && move.to_col === col,
  );
  const baseClass = (row + col) % 2 === 1 ? "white-square" : "black-square";
  if (validMove === undefined) {
    return baseClass;
  }
  const isAttack = validMove.capture !== null;
  if (isAttack) {
    if (validMove.type_interaction === null) {
      return `${baseClass} highlight-attack`;
    }
    return `${baseClass} ${getTypeInterationColor(validMove.type_interaction)}`;
  }
  return `${baseClass} highlight-move`;
}

const ChessBoard: React.FC<ChessBoardProps> = ({
  chessState,
  onPieceClick,
  makeMove,
  onPieceSelection,
  validMoves,
  isFlipped,
}) => {
  const handleSquareClick = (row: number, col: number) => {
    const validMove = validMoves.find(
      (move) => move.to_row === row && move.to_col === col,
    );
    if (validMove) {
      makeMove(validMove);
    } else {
      onPieceClick(row, col);
    }
  };

  const renderBoard = () => {
    let board = [...chessState.chessboard.board];
    if (isFlipped) {
      board = board.map((row) => [...row].reverse()).reverse();
    }

    return board.map((row, rowIndex) => (
      <div key={rowIndex} className="board-row">
        {row.map((piece, colIndex) => {
          const actualRow = isFlipped ? 7 - rowIndex: rowIndex;
          const actualCol = isFlipped ? 7 - colIndex: colIndex;
          return (
            <div
              key={colIndex}
              className={`board-square ${getSquareColor(actualRow, actualCol, validMoves)}`}
              onClick={() => handleSquareClick(actualRow, actualCol)}
            >
              <Piece_Component piece={piece} />
            </div>
          );
        })}
      </div>
    ));
  };

  return (
    <div className="chess-board-container">
      <div className="chess-board">
        <SelectPromotionPiecePopup
          isOpen={chessState.require_piece_selection}
          onPieceSelection={onPieceSelection}
        />
        {renderBoard()}
      </div>
    </div>
  );
};

export default ChessBoard;
