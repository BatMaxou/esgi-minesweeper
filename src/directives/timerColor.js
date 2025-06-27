export const vTimerColor = {
    mounted(el, binding) {
        updateTimerColor(el, binding.value)
    },
    updated(el, binding) {
        updateTimerColor(el, binding.value)
    }
}

function updateTimerColor(el, seconds) {
    el.classList.remove('timer-normal', 'timer-warning', 'timer-danger')

    if (seconds >= 20) {
        el.classList.add('timer-danger')
        el.style.color = 'red'
        el.style.fontWeight = 'bold'
    } else if (seconds >= 10) { // 10sec for testing
        el.classList.add('timer-warning')
        el.style.color = 'orange'
        el.style.fontWeight = 'bold'
    } else {
        el.classList.add('timer-normal')
        el.style.color = 'black'
        el.style.fontWeight = 'normal'
    }
} 
