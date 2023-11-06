import React from 'react';
import { ChessState, InfoMessage, Winner } from '../utils/chess_structs';

interface MessageBannerProps {
  chessState: ChessState;
}

const MessageBanner: React.FC<MessageBannerProps> = ({ chessState }) => {
  const getInfoMessage = (info_message?: InfoMessage) => {
    switch (info_message) {
      case InfoMessage.SuperEffective:
        return "It's super effective!";
      case InfoMessage.NotVeryEffective:
        return "It's not very effective.";
      case InfoMessage.NoEffect:
        return "It has no effect...";
      default:
        return '';
    }
  };

  const getWinnerMessage = (winner?: Winner) => {
    switch (winner) {
      case Winner.White:
        return "Game over! White wins!";
      case Winner.Black:
        return "Game over! Black wins!";
      case Winner.Tie:
        return "Game over! It's a tie!";
      default:
        return null; // When the winner is undefined or the game is ongoing without a NotYet state.
    }
  };

  // Get the current message based on the game state
  const winnerMessage = getWinnerMessage(chessState.winner);
  console.log(chessState);
  console.log(chessState.info_message, getInfoMessage(chessState.info_message))
  const info_message = chessState.info_message ? getInfoMessage(chessState.info_message) : null;
  const message = winnerMessage || info_message; // winnerMessage takes precedence over info_message.

  // Only render the banner if there's a message to show
  return message ? (
    <div className="message-banner">
      {message}
    </div>
  ) : null;
};

export default MessageBanner;

