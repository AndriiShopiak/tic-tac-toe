import type { Player } from '../App'

type Props = {
  value: Player | null
  onClick: () => void
}

export default function GameCell({ value, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      style={{
        width: 80,
        height: 80,
        fontSize: '2rem',
        cursor: 'pointer',
        backgroundColor: '#f1f1f1',
        border: '2px solid #ccc',
      }}
      disabled={!!value}
    >
      {value}
    </button>
  )
}
