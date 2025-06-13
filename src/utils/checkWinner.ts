import type { Player } from '../App'

export function checkWinner(board: (Player | null)[][], size: number): Player | 'draw' | null {
  
  for (let i = 0; i < size; i++) {
    if (board[i].every(cell => cell && cell === board[i][0])) return board[i][0]
    if (board.every(row => row[i] && row[i] === board[0][i])) return board[0][i]
  }

  
  if (board.every((row, i) => row[i] && row[i] === board[0][0])) return board[0][0]
  
  if (board.every((row, i) => row[size - 1 - i] && row[size - 1 - i] === board[0][size - 1]))
    return board[0][size - 1]

  
  if (board.flat().every(cell => cell)) return 'draw'

  return null
}
