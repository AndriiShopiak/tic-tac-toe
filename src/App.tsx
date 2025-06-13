import { useState } from "react";
import TurnIndicator from "./components/TurnIndicator";
import GameBoard from "./components/GameBoard";

export type Player = 'X' | 'O';

const initialBoard = Array(3).fill(null).map(() => Array(3).fill(null));

function App() {
  const [board, setBoard] = useState<(Player | null)[][]>(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');

  const handleCellClick = (row: number, col: number) => {
    if (board[row][col]) return

    const newBoard = board.map(row => [...row])
    newBoard[row][col] = currentPlayer
    setBoard(newBoard)

    setCurrentPlayer(prev => (prev === 'X' ? 'O' : 'X'))
  }
  
  return (
    <div style={{ padding: 20 }}>
      <TurnIndicator currentPlayer={currentPlayer} />
      <GameBoard board={board} onCellClick={handleCellClick} />
    </div>
  )
}

export default App
