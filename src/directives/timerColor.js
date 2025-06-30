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
  } else if (timeRatio <= 2 / 3) {
    el.classList.add('timer-warning')
  } else {
    el.classList.add('timer-normal')
  }
}
