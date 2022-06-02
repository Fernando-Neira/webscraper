const defaultConfig = require('./default-config.json')
const utils = require('../../utils')

const LOGGER_NAME = '[AfpModeloPage]'

class AfpModeloPage {
  constructor (page, config = defaultConfig) {
    this.PAGE_URL = process.env.AFMODELO_LOGIN_URL
    this.page = page
    this.configs = config
  }

  async open () {
    console.log(LOGGER_NAME, 'Opening page')
    await this.page.goto(this.PAGE_URL)
    //    await this.page.waitForEvent('load')
    console.log(LOGGER_NAME, 'Page loaded')
  }

  async login (username, password) {
    console.log(LOGGER_NAME, 'Typing username')
    await this.page.type(utils.findSelector(this.configs.selectors, 'input-rut').value, username)
    console.log(LOGGER_NAME, 'Typing password')
    await this.page.type(utils.findSelector(this.configs.selectors, 'input-clave').value, password)
    console.log(LOGGER_NAME, 'Clicking login button')
    await this.page.click(utils.findSelector(this.configs.selectors, 'btn-login').value)

    await this.page.waitForNavigation()
    console.log(LOGGER_NAME, 'Page loaded')
  }

  async checkActualBalance () {
    const $$elems = await this.page.$$(utils.findSelector(this.configs.selectors, 'balance-total').value)
    const balance = await $$elems[1].innerText()
    console.log(LOGGER_NAME, 'Actual balance:', balance)
    this.currentBalance = balance
  }

  get currentBalance () {
    return this.balance
  }

  set currentBalance (balance) {
    this.balance = balance
  }
}

module.exports = AfpModeloPage
