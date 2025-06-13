import type { Player } from '../App';
import "../index.css";

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
        fontWeight: 'bold',
        cursor: value ? 'default' : 'pointer',
        backgroundColor: '#fff',
        border: '2px solid #ccc',
        borderRadius: 6,
        transition: 'background-color 0.2s',
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
