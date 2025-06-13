import { formatTime } from "../utils/formatTime";


type Props = {
  winner: string
  onClose: () => void
  timers: { X: number; O: number }
}

export default function ResultModal({ winner, onClose, timers }: Props) {
  return (
    <div
      onClick={onClose}
      style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0,0,0,0.4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10,
    }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          backgroundColor: '#fff',
          padding: 30,
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          minWidth: 300,
          textAlign: 'center',
          animation: 'fadeIn 0.3s ease-in-out',
        }}
      >
        <h2>
          {winner === 'draw'
            ? `Нічия! Загальний час гри: ${formatTime(timers.X + timers.O)} сек`
            : `Гравець ${winner} переміг. Вітаємо! Час: ${formatTime(timers[winner as 'X' | 'O'])} сек`}
        </h2>

        <button style={{ marginTop: 16 }} onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  )
}
