import type { Player } from '../App.tsx'

type Props = {
  currentPlayer: Player
}

export default function TurnIndicator({ currentPlayer }: Props) {
  return (
    <div style={{ marginBottom: 16, fontSize: '1.2rem' }}>
      Ходить: гравець {currentPlayer}
    </div>
  )
}
