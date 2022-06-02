const axios = require('axios')

const sendMessage = ({ userId, message }) => {
  axios.get(`${process.env.API_TELEGRAM_BASE_URL}/test/hello?userId=${process.env.API_TELEGRAM_USERID_TEST}&name=${message}`)
    .then((response) => {
      console.log('[TELEGRAM-API] OK')
    })
    .catch(error => {
      console.error(error)
    })
}

module.exports = {
  sendMessage
}
