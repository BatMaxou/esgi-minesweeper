import { ref, computed, onUnmounted } from 'vue'

export function useTimer() {
    const startTime = ref(null)
    const currentTime = ref(null)
    const isRunning = ref(false)
    const intervalId = ref(null)

    const elapsedTime = computed(() => {
        if (!startTime.value || !currentTime.value) return 0
        return Math.floor((currentTime.value - startTime.value) / 1000)
    })

    const formattedTime = computed(() => {
        const totalSeconds = elapsedTime.value
        const minutes = Math.floor(totalSeconds / 60)
        const seconds = totalSeconds % 60
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
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

    onUnmounted(() => {
        stop()
    })

    return {
        elapsedTime,
        formattedTime,
        isRunning,
        start,
        stop,
        reset
    }
} 
