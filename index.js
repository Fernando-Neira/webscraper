const server = require('./src/server/server')
const { scripts } = require('./src/pages/afpmodelo')

server.listen(server.get('port'))

console.log(`Server on port ${server.get('port')}`)

scripts.checkActualBalance()
