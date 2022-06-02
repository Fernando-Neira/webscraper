const AfpModeloPage = require('./afpmodelo.cl')
const db = require('../../../db/database')
const { getAppConfig } = require('../../../config/app-config')
const { telegramContact } = require('../../../client/contact')

const { AFPMODELO_RUT, AFPMODELO_PWD } = process.env

const checkActualBalance = async () => {
  const page = await this.browser.newPage()
  const afpmodelo = new AfpModeloPage(page, await getAppConfig('afpmodelo'))
  await afpmodelo.open()
  await afpmodelo.login(AFPMODELO_RUT, AFPMODELO_PWD)
  await afpmodelo.checkActualBalance()
  //  await page.screenshot({ path: 'afpmodelo.png' })
  await page.close()

  db.ref('afpmodelo').push({
    date: new Date().toISOString(),
    balance: afpmodelo.currentBalance
  })

  telegramContact.sendMessage({ userId: '', message: `Balance AFP Modelo: ${afpmodelo.currentBalance}` })
}

const instance = ({ browser }) => {
  this.browser = browser
  return {
    checkActualBalance
  }
}

module.exports = instance
