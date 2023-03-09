// const formatDuration = (durationInSeconds) => {
//   const date = new Date(durationInSeconds * 1000)
//   const days = date.getDate() - 1 > 0 ? date.getDate() - 1 + 'd ' : ''
//   const hours = date.getHours() > 0 ? date.getHours() + 'h ' : ''
//   const minutes = date.getMinutes() > 0 ? date.getMinutes() + 'min' : ''
//   return days + hours + minutes
// }
import { intervalToDuration } from 'date-fns'
const formatDuration = (durationInSeconds) => {
  const duration = intervalToDuration({
    start: 0,
    end: durationInSeconds * 1000,
  })

  let durationStr = ''
  if (duration.days > 0) {
    durationStr += duration.days + 'd '
  }
  if (duration.hours > 0) {
    durationStr += duration.hours + 'h '
  }
  if (duration.minutes > 0) {
    durationStr += duration.minutes + 'm '
  }
  if (duration.seconds > 0) {
    durationStr += duration.seconds + 's'
  }
  return durationStr
}
export default formatDuration
