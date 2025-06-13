
import type { Player } from '../App'
import GameCell from './GameCell'

type Props = {
  board: (Player | null)[][]
  onCellClick: (row: number, col: number) => void
  winningLine: [number, number][]
}

export default function GameBoard({ board, onCellClick, winningLine }: Props) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${board.length}, min(20vw, 80px))`, gap: 5, justifyContent: 'center' }}>
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <GameCell
            key={`${rowIndex}-${colIndex}`}
            value={cell}
            onClick={() => onCellClick(rowIndex, colIndex)}
            isHighlighted={winningLine.some(([r, c]) => r === rowIndex && c === colIndex)}
          />
        ))
      )}
    </div>
  )
}
