
import type { Player } from '../App'
import GameCell from './GameCell'

type Props = {
  board: (Player | null)[][]
  onCellClick: (row: number, col: number) => void
}

export default function GameBoard({ board, onCellClick }: Props) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${board.length}, 80px)`, gap: 5 }}>
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <GameCell
            key={`${rowIndex}-${colIndex}`}
            value={cell}
            onClick={() => onCellClick(rowIndex, colIndex)}
          />
        ))
      )}
    </div>
  )
}
