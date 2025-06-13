import type { Player } from '../App';

export function createEmptyBoard(size: number): (Player | null)[][] {
  return Array(size)
    .fill(null)
    .map(() => Array(size).fill(null));
}
