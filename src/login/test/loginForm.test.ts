import { auth } from "../../secrets/passwords"
import { LoginPage } from "../../page-objects/Login.page"
import { MainPage } from "../../page-objects/Main.pages"

describe('Login from', () => {
    let loginPage: LoginPage

    before(async () => {
        loginPage = new LoginPage(browser)
    })

    beforeEach(async () => {
        await loginPage.open()
    })


    it('#1 Login with valid email and valid password', async () => {
        await loginPage.login(auth)
        const mainPage: MainPage = new MainPage(browser)
        const isDisplayedElement: boolean = await mainPage.isDisplayedUserLogin()
        expect(isDisplayedElement).toEqual(true)
    })

})