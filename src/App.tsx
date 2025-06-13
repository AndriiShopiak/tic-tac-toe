import { useState } from "react";
import TurnIndicator from "./components/TurnIndicator";
import GameBoard from "./components/GameBoard";
import { checkWinner } from './utils/checkWinner';
import ResultModal from './components/ResultModal';

export type Player = 'X' | 'O';

const initialBoard = Array(3).fill(null).map(() => Array(3).fill(null));

function App() {
  const [board, setBoard] = useState<(Player | null)[][]>(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');

  const [winner, setWinner] = useState<Player | 'draw' | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [wins, setWins] = useState<{ X: number; O: number }>({ X: 0, O: 0 });
  const [totalGames, setTotalGames] = useState(0);
  const [pendingNewGame, setPendingNewGame] = useState(false);


  const handleCellClick = (row: number, col: number) => {
    if (board[row][col] || winner) return;
    if (winner || pendingNewGame) return;


    const newBoard = board.map(r => [...r])
    newBoard[row][col] = currentPlayer
    setBoard(newBoard)

    const nextPlayer = currentPlayer === 'X' ? 'O' : 'X'
    setCurrentPlayer(nextPlayer)

    const result = checkWinner(newBoard, 3)
    if (result) {
      setWinner(result);
      setTimeout(() => setShowModal(true), 2000);

      if (result === 'X' || result === 'O') {
        setWins(prev => ({ ...prev, [result]: prev[result] + 1 }));
      }
      setTotalGames(prev => prev + 1);
    }
};

const handleNewGame = () => {
  if (!winner) setPendingNewGame(true);

  setBoard(initialBoard)
  setCurrentPlayer('X')
  setWinner(null)
  setShowModal(false)
  setPendingNewGame(false)
}

  
  return (
    <div style={{ padding: 20 }}>
      <TurnIndicator currentPlayer={currentPlayer} />
      <div style={{ marginBottom: 16 }}>
        <button onClick={handleNewGame}>Нова гра</button>
      </div>
      <div style={{ marginBottom: 16 }}>
        <div>Гравець 1: ● символ – X ● перемог – {wins.X}</div>
        <div>Гравець 2: ● символ – O ● перемог – {wins.O}</div>
        <div>Зіграно ігор: {totalGames}</div>
      </div>
      <GameBoard board={board} onCellClick={handleCellClick} />
      {showModal && winner && (
        <ResultModal winner={winner} onClose={() => setShowModal(false)} />
      )}
    </div>
  )
}

export default App
