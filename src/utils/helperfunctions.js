const formatDuration = (durationInSeconds) => {
  const date = new Date(durationInSeconds * 1000)
  const days = date.getDate() - 1 > 0 ? date.getDate() - 1 + 'd ' : ''
  const hours = date.getHours() > 0 ? date.getHours() + 'h ' : ''
  const minutes = date.getMinutes() > 0 ? date.getMinutes() + 'min' : ''
  return days + hours + minutes
}

export default formatDuration
