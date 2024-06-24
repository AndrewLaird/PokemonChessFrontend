import axios from 'axios';
import { ChessState, Move } from './chess_structs';

async function startGame(
  sessionName: String,
  simplifiedVisual: boolean,
  onlinePlay: boolean,
  criticalHits: boolean,
  misses: boolean
): Promise<ChessState> {
  try {
    const response = await axios.get<ChessState>('http://localhost:3000/start', {
      params: {
        name: sessionName,
        simplified_visual: simplifiedVisual,
        online_play: onlinePlay,
        critical_hits: criticalHits,
        misses: misses,
      },
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw error; // Handle error appropriately
  }
}

async function getMoves(sessionName: string, row: number, col: number): Promise<Move[]> {
  try {
    const response = await axios.get<Move[]>('http://localhost:3000/get_moves', {
      params: {
        name: sessionName,
        row,
        col,
      },
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw error; // Handle error appropriately
  }
}

async function movePiece(
  sessionName: string,
  fromRow: number,
  fromCol: number,
  toRow: number,
  toCol: number
): Promise<ChessState> {
  try {
    const response = await axios.get<ChessState>('http://localhost:3000/move_piece', {
      params: {
        name: sessionName,
        from_row: fromRow,
        from_col: fromCol,
        to_row: toRow,
        to_col: toCol,
      },
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw error; // Handle error appropriately
  }
}

async function generateName(){
  try {
      const response = await axios.get<String>('http://localhost:3000/generate_name', {})
      return response.data;
  } catch (error) {
    throw error; // Handle error appropriately
  }

}

// Function to get the game state using Axios
async function getGameState(gameName: string): Promise<ChessState | null> {
    try {
        const response = await axios.get<ChessState>('http://localhost:3000/get_game_state', {
            params: {
                name: gameName
            },
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });

        return response.data ?? null;
    } catch (error) {
        throw error; // Handle error appropriately
    }
}

async function selectPawnPromotionPiece(sessionName: string, pieceStr: string): Promise<ChessState> { 
  try { 
      const response = await axios.get<ChessState>('http://localhost:3000/select_pawn_promotion_piece', {
        params: { 
          name: sessionName, piece_str: pieceStr,
        }, 
        headers: { 
          Accept: 'application/json', 'Content-Type': 'application/json',
        },
      }); 
      return response.data;
  } catch (error) { 
    throw error; // Handle error appropriately
  }
}

export { startGame, getMoves, movePiece, generateName, getGameState, selectPawnPromotionPiece };
