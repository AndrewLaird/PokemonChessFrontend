import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { ChessState, Move, Player } from '../utils/chess_structs';
import Chessboard from './Chessboard';
import PokeballIndicator from './PokeballIndicator';
import LoadingPokeBall from './LoadingPokeBall';
import './Game.css';
import PokemonTitle from '../assets/PokemonTitle.png';

type ClientMessage = 
  | { action: 'GetMoves', payload: { name: string, row: number, col: number } }
  | { action: 'MovePiece', payload: { name: string, from_row: number, from_col: number, to_row: number, to_col: number } }
  | { action: 'SelectPawnPromotionPiece', payload: { name: string, piece_str: string } }
  | { action: 'GetPreviousState', payload: { name: string } }
  | { action: 'GetNextState', payload: { name: string } }
  | { action: 'GetCurrentState', payload: { name: string } };

type ServerMessage = 
  | { status: 'Success', data: { chess_state?: ChessState, moves?: Move[] } }
  | { status: 'Error', message: string };

const WEBSOCKET_URL = 'ws://localhost:3000/ws';

const ChessGame: React.FC = () => {
  const { pokemon_name, player } = useParams<{ pokemon_name?: string, player?: string }>();
  const [chessState, setChessState] = useState<ChessState | null>(null);
  const [validMoves, setValidMoves] = useState<Move[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<string>('Connecting');

  const isFlipped = player !== "black";

  const { 
    sendMessage, 
    lastMessage, 
    readyState 
  } = useWebSocket(WEBSOCKET_URL, {
    reconnectAttempts: 5,
    reconnectInterval: 3000,
    shouldReconnect: (closeEvent) => true,
  });

  useEffect(() => {
    if (lastMessage !== null) {
      const message: ServerMessage = JSON.parse(lastMessage.data);
      if (message.status === 'Success') {
        if (message.data.chess_state) {
          // clear valid moves so we don't see trails
          setValidMoves([]);
          setChessState(message.data.chess_state);
        } else if (message.data.moves) {
          setValidMoves(message.data.moves);
        }
      } else if (message.status === 'Error') {
        console.error('Server error:', message.message);
        // TODO: Display error message to user
      }
    }
  }, [lastMessage]);

  useEffect(() => {
    switch (readyState) {
      case ReadyState.CONNECTING:
        setConnectionStatus('Connecting');
        break;
      case ReadyState.OPEN:
        setConnectionStatus('Connected');
        break;
      case ReadyState.CLOSING:
        setConnectionStatus('Closing');
        break;
      case ReadyState.CLOSED:
        setConnectionStatus('Disconnected');
        break;
      default:
        setConnectionStatus('Unknown');
        break;
    }
  }, [readyState]);

  const sendWebSocketMessage = useCallback((message: ClientMessage) => {
    if (readyState === ReadyState.OPEN) {
      sendMessage(JSON.stringify(message));
    } else {
      // reconnect
      console.warn('WebSocket is not open. Cannot send message:', message);
    }
  }, [sendMessage, readyState]);

  const handlePieceClick = useCallback((row: number, col: number) => {
    if (pokemon_name) {
      sendWebSocketMessage({ action: 'GetMoves', payload: { name: pokemon_name, row, col } });
    }
  }, [sendWebSocketMessage, pokemon_name]);

  const handleMakeMove = useCallback((move: Move) => {
    if (pokemon_name) {
      sendWebSocketMessage({
        action: 'MovePiece',
        payload: {
          name: pokemon_name,
          from_row: move.from_row,
          from_col: move.from_col,
          to_row: move.to_row,
          to_col: move.to_col
        }
      });
      setValidMoves([]);
    }
  }, [sendWebSocketMessage, pokemon_name]);

  const handlePieceSelection = useCallback((piece: string) => {
    if (pokemon_name) {
      sendWebSocketMessage({ action: 'SelectPawnPromotionPiece', payload: { name: pokemon_name, piece_str: piece } });
    }
  }, [sendWebSocketMessage, pokemon_name]);

  const undoMove = useCallback(() => {
    if (pokemon_name) {
      sendWebSocketMessage({ action: 'GetPreviousState', payload: { name: pokemon_name } });
    }
  }, [sendWebSocketMessage, pokemon_name]);

  const redoMove = useCallback(() => {
    if (pokemon_name) {
      sendWebSocketMessage({ action: 'GetNextState', payload: { name: pokemon_name } });
    }
  }, [sendWebSocketMessage, pokemon_name]);

  useEffect(() => {
    console.log(readyState, pokemon_name);
    if (readyState === ReadyState.OPEN && pokemon_name) {
      console.log("going");
      sendWebSocketMessage({ action: 'GetCurrentState', payload: { name: pokemon_name } });
    }
  }, [readyState, sendWebSocketMessage, pokemon_name]);

  if (!pokemon_name) {
    return <Navigate to="/" />;
  }

  return (
    <div className="game-container">
      {
        <div style={{ color: 'white' }}>Connection status: {connectionStatus}</div>
      }
      {chessState ? (
        <>
          <div className="scaling-container">
          <img className="chess-title" src={PokemonTitle} alt="Pokemon Chess" />
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
            isFlipped={isFlipped}
          />
          <PokeballIndicator 
            displayLeft={false}
            hidden={isFlipped ? chessState.player === Player.Black : chessState.player === Player.White}
            />
          <div>
            <button className="undo-btn state-btn" onClick={undoMove} aria-label="Undo move"></button>
            <button className="redo-btn state-btn" onClick={redoMove} aria-label="Redo move"></button>
          </div>
          </div>
        </>
      ) : (
        <div><div className="scaling-container"><div>Loading game...</div><div><LoadingPokeBall/></div></div></div>
      )}
    </div>
  );
};

export default ChessGame;
