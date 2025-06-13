

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
        backgroundColor: 'rgba(0,0,0,0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          backgroundColor: '#fff',
          padding: 20,
          borderRadius: 8,
          minWidth: 300,
          textAlign: 'center',
        }}
      >
        <h2>
          {winner === 'draw'
            ? `Нічия! Загальний час гри: ${timers.X + timers.O} сек`
            : `Гравець ${winner} переміг. Вітаємо! Час: ${timers[winner as 'X' | 'O']} сек`}
        </h2>

        <button style={{ marginTop: 16 }} onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  )
}
