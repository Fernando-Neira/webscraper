const ColmenaPage = require('./colmena.cl')
const db = require('../../../db/database')
const { getAppConfig } = require('../../../config/app-config')
const { telegramContact } = require('../../../client/contact')

const { COLMENA_RUT, COLMENA_PWD } = process.env

const checkActualBalance = async () => {
  const page = await this.browser.newPage()
  const colmena = new ColmenaPage(page, await getAppConfig('colmena'))
  await colmena.open()
  await colmena.login(COLMENA_RUT, COLMENA_PWD)
  await colmena.checkActualBalance()
  //  await page.screenshot({ path: 'colmena.png' })
  await page.close()

  db.ref('colmena').push({
    date: new Date().toISOString(),
    balance: colmena.currentBalance
  })

  telegramContact.sendMessage({ userId: '', message: `Balance Isapre Colmena: ${colmena.currentBalance}` })
}

const instance = ({ browser }) => {
  this.browser = browser
  return {
    checkActualBalance
  }
}

module.exports = instance
