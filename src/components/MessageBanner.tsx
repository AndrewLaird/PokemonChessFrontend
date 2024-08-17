import React from 'react';
import { ChessState, InfoMessage, Winner } from '../utils/chess_structs';
import './MessageBanner.css';
import announcerMessages from './announcerMessages';

interface MessageBannerProps {
  chessState: ChessState;
}

const MessageBanner: React.FC<MessageBannerProps> = ({ chessState }) => {
  const getSeedFromName = (name: string): number => {
    return name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  };

  const seededRandom = (seed: number): number => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

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
        return null; 
    }
  };

  // Get the current message based on the game state
  const winnerMessage = getWinnerMessage(chessState.winner);
  const info_message = chessState.info_message ? getInfoMessage(chessState.info_message) : null;
  const message = winnerMessage || info_message || null 

  return <div className="message-banner" style={{'visibility': message ? 'visible' : 'hidden'}}>
          {message}
        </div>
};

export default MessageBanner;

