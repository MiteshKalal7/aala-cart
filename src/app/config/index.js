// export const API_URL = 'http://18.116.143.95/ala-cart/api/v1/'
export const API_URL = 'https://api.aalacart.com/api/v1/'
export const convertDate = (timestamp) => {
  var date = new Date(timestamp * 1000)
  var year = date.getFullYear()
  var month = ('0' + (date.getMonth() + 1)).substr(-2)
  var day = ('0' + date.getDate()).substr(-2)
  var hour = ('0' + date.getHours()).substr(-2)
  var minutes = ('0' + date.getMinutes()).substr(-2)
  //   var seconds = ('0' + date.getSeconds()).substr(-2)

  return month + '/' + day + '/' + year + ' ' + hour + ':' + minutes
}
export const timeSince = (date) => {
  var seconds = Math.floor((new Date() - date * 1000) / 1000)

  var interval = seconds / 31536000

  if (interval > 1) {
    return Math.floor(interval) + ' years ago'
  }
  interval = seconds / 2592000
  if (interval > 1) {
    return Math.floor(interval) + ' months ago'
  }
  interval = seconds / 86400
  if (interval > 1) {
    return Math.floor(interval) + ' days ago'
  }
  interval = seconds / 3600
  if (interval > 1) {
    return Math.floor(interval) + ' hours ago'
  }
  interval = seconds / 60
  if (interval > 1) {
    return Math.floor(interval) + ' minutes ago'
  }
  return Math.floor(seconds) + ' seconds ago'
}
