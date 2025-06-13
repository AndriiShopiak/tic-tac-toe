import type { Player } from '../App';
import "../index.css";

type Props = {
  value: Player | null
  onClick: () => void
  isHighlighted?: boolean
}

export default function GameCell({ value, onClick, isHighlighted }: Props) {
  return (
    <button
      onClick={onClick}
      style={{
        width: 80,
        height: 80,
        fontSize: '2rem',
        fontWeight: 'bold',
        cursor: value ? 'default' : 'pointer',
        border: '2px solid #ccc',
        borderRadius: 6,
        backgroundColor: isHighlighted ? '#ffeb3b' : '#fff',
        boxShadow: isHighlighted
          ? '0 0 10px 2px rgba(255, 235, 59, 0.7)'
          : 'none',
        transition: 'all 0.2s ease',
      }}
        disabled={!!value}
    >
      {value && (
        <span
          style={{
            animation: 'popIn 0.5s ease',
          }}
        >
          {value}
        </span>
      )}
    </button>
  )
}
