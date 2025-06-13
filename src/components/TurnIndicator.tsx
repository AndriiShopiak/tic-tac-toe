import type { Player } from '../App.tsx'

type Props = {
  currentPlayer: Player
}

export default function TurnIndicator({ currentPlayer }: Props) {
  return (
    <div
      style={{
        fontSize: '1.2rem',
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
      }}
    >
      Зараз ходить: <span style={{ color: currentPlayer === 'X' ? '#1976d2' : '#d32f2f' }}>
        гравець {currentPlayer}
      </span>
    </div>
  )
};
