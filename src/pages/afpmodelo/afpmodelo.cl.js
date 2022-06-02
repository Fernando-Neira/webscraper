class AfpModeloPage {
  constructor (page) {
    this.PAGE_URL = process.env.AFMODELO_LOGIN_URL
    this.page = page
  }

  async open () {
    console.log('Opening page')
    await this.page.goto(this.PAGE_URL)
    //    await this.page.waitForEvent('load')
    console.log('Page loaded')
  }

  async login (username, password) {
    console.log('Typing usernem')
    await this.page.type('#ContentPlaceHolder1_Login_Rut', username)
    console.log('Typing password')
    await this.page.type('#ContentPlaceHolder1_Login_Clave', password)
    console.log('Clicking login button')
    await this.page.click('#ContentPlaceHolder1_Btn_Ingresar')

    await this.page.waitForNavigation()
    console.log('Page loaded')
  }

  async checkActualBalance () {
    const $$elems = await this.page.$$('.txt_total_ahorrado')
    const balance = await $$elems[1].innerText()
    console.log('Actual balance:', balance)
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
