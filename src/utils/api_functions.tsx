import axios from 'axios';
import { ChessState, Settings, Move } from './chess_structs';


// if dev set to localhost:3000
const baseURL = "http://localhost:3000";
// const baseURL = "http://44.200.13.154:3000";

async function startGame(
  sessionName: String,
  localPlay: boolean,
  criticalHits: boolean,
  misses: boolean
): Promise<ChessState> {
  try {
    const response = await axios.get<ChessState>(`${baseURL}/start`, {
      params: {
        name: sessionName,
        local_play: localPlay,
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
    const response = await axios.get<Move[]>(`${baseURL}/get_moves`, {
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
    const response = await axios.get<ChessState>(`${baseURL}/move_piece`, {
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
      const response = await axios.get<String>(`${baseURL}/generate_name`, {})
      return response.data;
  } catch (error) {
    throw error; // Handle error appropriately
  }

}

// Function to get the game state using Axios
async function getGameState(gameName: string): Promise<ChessState | null> {
    try {
        const response = await axios.get<ChessState>(`${baseURL}/get_game_state`, {
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
      const response = await axios.get<ChessState>(`${baseURL}/select_pawn_promotion_piece`, {
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

async function getPreviousState(gameName: string): Promise<ChessState> {
    const response = await axios.get<ChessState>(`${baseURL}/get_previous_state`, {
        params: {
            name: gameName
        },
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });
    return response.data;
}

async function getNextState(gameName: string): Promise<ChessState> {
    const response = await axios.get<ChessState>(`${baseURL}/get_next_state`, {
        params: {
            name: gameName
        },
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });
    return response.data;
}

export { startGame, getMoves, movePiece, generateName, getGameState, selectPawnPromotionPiece, getPreviousState, getNextState };
