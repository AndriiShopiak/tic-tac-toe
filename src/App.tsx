import GameBoard from './components/GameBoard'
import TurnIndicator from './components/TurnIndicator'
import ResultModal from './components/ResultModal'
import { checkWinner } from './utils/checkWinner'
import { createEmptyBoard } from './utils/createEmptyBoard'
import { usePlayerTimers } from './hooks/usePlayerTimers'
import { formatTime } from './utils/formatTime'
import { useState } from 'react'

export type Player = 'X' | 'O'

function App() {
  const [boardSize, setBoardSize] = useState(3)
  const [board, setBoard] = useState<(Player | null)[][]>(() =>
    createEmptyBoard(boardSize)
  )
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X')
  const [winner, setWinner] = useState<Player | 'draw' | null>(null)
  const [winningLine, setWinningLine] = useState<[number, number][]>([])
  const [showModal, setShowModal] = useState(false)
  const [wins, setWins] = useState<{ X: number; O: number }>({ X: 0, O: 0 })
  const [totalGames, setTotalGames] = useState(0)
  const [pendingNewGame, setPendingNewGame] = useState(false)

  const [timers, , stopTimers] = usePlayerTimers(
    currentPlayer,
    !winner && !pendingNewGame
  )

  const handleCellClick = (row: number, col: number) => {
    if (board[row][col] || winner || pendingNewGame) return

    const newBoard = board.map(r => [...r])
    newBoard[row][col] = currentPlayer
    setBoard(newBoard)

    const nextPlayer = currentPlayer === 'X' ? 'O' : 'X'
    setCurrentPlayer(nextPlayer)

    const result = checkWinner(newBoard, boardSize)
    if (result.winner) {
      setWinner(result.winner)
      setWinningLine(result.line)
      setTimeout(() => setShowModal(true), 2000)

      if (result.winner === 'X' || result.winner === 'O') {
        setWins(prev => ({
          ...prev,
          [result.winner as Player]: prev[result.winner as Player] + 1,
        }))
      }
      setTotalGames(prev => prev + 1)
    }
  }

  const handleNewGame = () => {
    if (!winner) setPendingNewGame(true)

    stopTimers()
    setBoard(createEmptyBoard(boardSize))
    setCurrentPlayer('X')
    setWinner(null)
    setWinningLine([])
    setShowModal(false)
    setPendingNewGame(false)
  }

  return (
    <div
      style={{
        padding: 20,
        maxWidth: 500,
        margin: '0 auto',
        minHeight: '100vh',
        backgroundColor: '#f7f7f7',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <h1 style={{ textAlign: 'center' }}>Хрестики-Нолики</h1>

      <div style={{ marginBottom: 16 }}>
        <label>Розмір сітки: </label>
        <select
          value={boardSize}
          onChange={e => setBoardSize(Number(e.target.value))}
        >
          {Array.from({ length: 7 }, (_, i) => i + 3).map(size => (
            <option key={size} value={size}>
              {size}×{size}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: 16 }}>
        <button onClick={handleNewGame} disabled={showModal}>
          Нова гра
        </button>
      </div>

      <div style={{ marginBottom: 16 }}>
        <div>Гравець 1: ● символ – X ● перемог – {wins.X}</div>
        <div>Гравець 2: ● символ – O ● перемог – {wins.O}</div>
        <div>Зіграно ігор: {totalGames}</div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <div>⏱️ Час гравця X: {formatTime(timers.X)}</div>
        <div>⏱️ Час гравця O: {formatTime(timers.O)}</div>
      </div>

      <TurnIndicator currentPlayer={currentPlayer} />
      <GameBoard
        board={board}
        onCellClick={handleCellClick}
        winningLine={winningLine}
      />

      {showModal && winner && (
        <ResultModal
          winner={winner}
          timers={timers}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  )
}

export default App
