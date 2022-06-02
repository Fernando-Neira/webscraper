require('dotenv').config()
const server = require('./src/server/server')
const { chromium } = require('playwright')
const afpmodelo = require('./src/pages/afp/modelo')
const colmena = require('./src/pages/isapre/colmena')

server.listen(server.get('port'))

console.log(`Server on port ${server.get('port')}`)

;(async () => {
  const browser = await chromium.launch({ headless: false })
  const scripts = colmena.instance({ browser })

  scripts.checkActualBalance()
})()
