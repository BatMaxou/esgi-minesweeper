import {computed, onUnmounted, ref} from 'vue'

export function useTimer(durationInSeconds = 300) {
  const startTime = ref(null)
  const currentTime = ref(null)
  const isRunning = ref(false)
  const intervalId = ref(null)
  const duration = ref(durationInSeconds)

  const elapsedTime = computed(() => {
    if (!startTime.value || !currentTime.value) return 0
    return Math.floor((currentTime.value - startTime.value) / 1000)
  })

  const remainingTime = computed(() => {
    const remaining = duration.value - elapsedTime.value
    return Math.max(0, remaining)
  })

  const formattedTime = computed(() => {
    const totalSeconds = remainingTime.value
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  })

  const isTimeUp = computed(() => {
    return remainingTime.value === 0
  })

  const start = () => {
    if (isRunning.value) return

    startTime.value = Date.now()
    currentTime.value = Date.now()
    isRunning.value = true

    intervalId.value = setInterval(() => {
      currentTime.value = Date.now()
    }, 1000)
  }

  const stop = () => {
    if (intervalId.value) {
      clearInterval(intervalId.value)
      intervalId.value = null
    }
    isRunning.value = false
  }

  const reset = () => {
    stop()
    startTime.value = null
    currentTime.value = null
  }

  const setDuration = (newDuration) => {
    duration.value = newDuration
  }

  onUnmounted(() => {
    stop()
  })

  return {
    remainingTime,
    formattedTime,
    isRunning,
    isTimeUp,
    elapsedTime,
    start,
    stop,
    reset,
    setDuration
  }
}
