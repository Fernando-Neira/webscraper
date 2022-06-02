const db = require('../db/database')

const appConfigs = {
  afpmodelo: require('../pages/afp/modelo/default-config.json'),
  colmena: require('../pages/isapre/colmena/default-config.json')
}

db.ref('app-configs').set(appConfigs)

const getAppConfig = ({ app }) => {
  return db.ref('app-configs').get().then((snapshot) => {
    if (snapshot.exists()) {
      const config = snapshot.val()
      return config[app]
    } else {
      return undefined
    }
  })
}

module.exports = {
  getAppConfig
}
