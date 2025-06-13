import type { Player } from '../App';

export function checkWinner(board: (Player | null)[][], size: number): {
  winner: Player | 'draw' | null
  line: [number, number][] // координати клітинок
} {
  // Перевірка горизонталі та вертикалі
  for (let i = 0; i < size; i++) {
    if (
      board[i].every(cell => cell && cell === board[i][0])
    ) {
      return {
        winner: board[i][0],
        line: board[i].map((_, col) => [i, col]),
      }
    }

    if (
      board.every(row => row[i] && row[i] === board[0][i])
    ) {
      return {
        winner: board[0][i],
        line: board.map((_, row) => [row, i]),
      }
    }
  }

  // Діагональ ↘
  if (board.every((row, i) => row[i] && row[i] === board[0][0])) {
    return {
      winner: board[0][0],
      line: board.map((_, i) => [i, i]),
    }
  }

  // Діагональ ↙
  if (board.every((row, i) => row[size - 1 - i] && row[size - 1 - i] === board[0][size - 1])) {
    return {
      winner: board[0][size - 1],
      line: board.map((_, i) => [i, size - 1 - i]),
    }
  }

  // Нічия
  if (board.flat().every(cell => cell)) {
    return { winner: 'draw', line: [] }
  }

  return { winner: null, line: [] }
}

