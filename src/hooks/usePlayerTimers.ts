import { useEffect, useRef, useState } from 'react';
import type { Player } from '../App';

export function usePlayerTimers(
  currentPlayer: Player,
  isRunning: boolean
): [Record<Player, number>, () => void, () => void] {
  const [timers, setTimers] = useState<Record<Player, number>>({ X: 0, O: 0 })
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const start = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)

    intervalRef.current = setInterval(() => {
      setTimers(prev => ({
        ...prev,
        [currentPlayer]: prev[currentPlayer] + 1,
      }))
    }, 1000)
  }

  const stop = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
  }

  useEffect(() => {
    if (isRunning) {
      start()
    } else {
      stop()
    }

    return () => stop()
  }, [currentPlayer, isRunning])

  return [timers, start, stop]
}
