import { useState } from 'react'
import { useInterval } from './useInterval'

const INCREMENT = 5

export function useFakeProgress(): [number, () => void, () => void] {
  const [fakeProgress, setFakeProgress] = useState(0)
  const [isActive, setIsActive] = useState(false)
  function stopFakeProgress() {
    setIsActive(false)
    setFakeProgress(0)
  }
  function startFakeProgress() {
    setIsActive(true)
  }

  useInterval(
    () => {
      if (fakeProgress >= 100) {
        stopFakeProgress()
      } else {
        setFakeProgress(fakeProgress + INCREMENT)
      }
    },
    isActive ? 500 : null,
  )
  return [fakeProgress, startFakeProgress, stopFakeProgress]
}
