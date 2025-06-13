

type Props = {
  winner: string
  onClose: () => void
}

export default function ResultModal({ winner, onClose }: Props) {
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
            ? 'Нічия! Спробуйте ще :)'
            : `Гравець ${winner} переміг. Вітаємо!`}
        </h2>
        <button style={{ marginTop: 16 }} onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  )
}
