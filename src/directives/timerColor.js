export const vTimerColor = {
  mounted(el, binding) {
    updateTimerColor(el, binding.value)
  },
  updated(el, binding) {
    updateTimerColor(el, binding.value)
  }
}

function updateTimerColor(el, {remainingTime, totalDuration}) {
  el.classList.remove('timer-normal', 'timer-warning', 'timer-danger')

  const timeRatio = remainingTime / totalDuration

  if (timeRatio <= 1 / 3) {
    el.classList.add('timer-danger')
    el.style.color = 'red'
    el.style.fontWeight = 'bold'
  } else if (timeRatio <= 2 / 3) {
    el.classList.add('timer-warning')
    el.style.color = 'orange'
    el.style.fontWeight = 'bold'
  } else {
    el.classList.add('timer-normal')
    el.style.color = 'black'
    el.style.fontWeight = 'normal'
  }
}
