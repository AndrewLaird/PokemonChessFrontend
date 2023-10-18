// Define enums
export enum Player {
  White = "White",
  Black = "Black",
}

export enum ChessPieceType {
  Empty = "Empty",
  WhitePawn = "WhitePawn",
  WhiteKnight = "WhiteKnight",
  WhiteBishop = "WhiteBishop",
  WhiteRook = "WhiteRook",
  WhiteQueen = "WhiteQueen",
  WhiteKing = "WhiteKing",
  BlackPawn = "BlackPawn",
  BlackKnight = "BlackKnight",
  BlackBishop = "BlackBishop",
  BlackRook = "BlackRook",
  BlackQueen = "BlackQueen",
  BlackKing = "BlackKing",
}

export enum InteractionType {
  SuperEffective = "SuperEffective",
  NotVeryEffective = "NotVeryEffective",
  NoEffect = "NoEffect",
  Normal = "Normal",
  Empty = "Empty",
}

export enum PokemonType {
  Normal = "Normal",
  Fire = "Fire",
  Water = "Water",
  Electric = "Electric",
  Grass = "Grass",
  Ice = "Ice",
  Fighting = "Fighting",
  Poison = "Poison",
  Ground = "Ground",
  Flying = "Flying",
  Psychic = "Psychic",
  Bug = "Bug",
  Rock = "Rock",
  Ghost = "Ghost",
  Dragon = "Dragon",
  Dark = "Dark",
  Steel = "Steel",
  Fairy = "Fairy",
}

// The rest of your interfaces remain unchanged.
// ...


// Define interfaces
export interface Piece {
  piece_type: ChessPieceType;
  pokemon_type: PokemonType;
}

export interface Move {
  piece_type: ChessPieceType;
  from_row: number;
  from_col: number;
  to_row: number;
  to_col: number;
  type_interaction?: InteractionType;
  capture?: Capture;
  castle?: Castle;
}

export interface Castle {
  rook_from_row: number;
  rook_from_col: number;
  rook_to_row: number;
  rook_to_col: number;
}

export interface Capture {
  row: number;
  col: number;
  piece: Piece;
}

export interface ChessHistory {
  move_history: Move[];
}

export interface ChessBoard {
  board: Piece[][];
  history: ChessHistory;
}

export interface ChessState {
  chessboard: ChessBoard;
  player: Player;
}
