require('dotenv').config()
const AfpModeloPage = require('./afpmodelo.cl').default
const { chromium } = require('playwright')
const axios = require('axios')
const { db } = require('../../db/database')

const { AFPMODELO_RUT, AFPMODELO_PWD } = process.env

const script = async () => {
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()
  const afpmodelo = new AfpModeloPage(page)
  await afpmodelo.open()
  await afpmodelo.login(AFPMODELO_RUT, AFPMODELO_PWD)
  await afpmodelo.checkActualBalance()
  //  await page.screenshot({ path: 'afpmodelo.png' })
  await browser.close()

  db.ref('afpmodelo').push({
    date: new Date().toISOString(),
    balance: afpmodelo.currentBalance
  })

  axios.get(`http://localhost:8080/test/hello?userId=609029175&name=${afpmodelo.currentBalance}`)
    .then((response) => {
      console.log('OK')
    })
    .catch(error => {
      console.error(error)
    })
}

module.exports = {
  checkActualBalance: script
}
