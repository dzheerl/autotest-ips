//*[@id="login"]
//*[@id="login_field"]
//*[@id="password"]
//*[@type="submit"]
//*[@data-login="TestUserIps"]
//Qwerty123TestIps!

//*[@id="js-flash-container"]
//*[@id='forgot-password']

import { auth } from "../../secrets/passwords"

describe('Login from', () => {
    beforeEach(async () => {
        await browser.url('https://github.com/login')
    })

    it('#1 Login with valid email and valid password', async () => {
        await browser.$('//*[@id="login"]').waitForDisplayed({
            timeoutMsg: 'Login form was not displayed',
        })

        await browser.$('//*[@id="login_field"]').waitForDisplayed({
            timeoutMsg: 'Login field was not displayed',
        })

        await browser.$('//*[@id="login_field"]').setValue(auth.email)

        await browser.$('//*[@id="password"]').waitForDisplayed({
            timeoutMsg: 'Password was not displayed',
        })

        await browser.$('//*[@id="password"]').setValue(auth.password)

        await browser.$('//*[@type="submit"]').waitForClickable({
            timeoutMsg: 'Submit was not displayed',
        })

        await browser.$('//*[@type="submit"]').click()

        const isDisplayedElement: boolean = await browser.$('//form[@action="/sessions/verified-device"] | //*[@data-login="TestUserIps"]').isDisplayed()

        expect(isDisplayedElement).toEqual(true)
    })

    it('#2 Login with valid login and valid password', async () => {
        await browser.$('//*[@id="login"]').waitForDisplayed({
            timeoutMsg: 'Login form was not displayed',
        })

        await browser.$('//*[@id="login_field"]').waitForDisplayed({
            timeoutMsg: 'Login field was not displayed',
        })

        await browser.$('//*[@id="login_field"]').setValue(auth.login)

        await browser.$('//*[@id="password"]').waitForDisplayed({
            timeoutMsg: 'Password was not displayed',
        })

        await browser.$('//*[@id="password"]').setValue(auth.password)

        await browser.$('//*[@type="submit"]').waitForClickable({
            timeoutMsg: 'Submit was not displayed',
        })

        await browser.$('//*[@type="submit"]').click()

        const isDisplayedElement: boolean = await browser.$('//form[@action="/sessions/verified-device"] | //*[@data-login="TestUserIps"]').isDisplayed()

        expect(isDisplayedElement).toEqual(true)
    })

    it('#3 Login with valid login and invalid password', async () => {
        await browser.$('//*[@id="login"]').waitForDisplayed({
            timeoutMsg: 'Login form was not displayed',
        })

        await browser.$('//*[@id="login_field"]').waitForDisplayed({
            timeoutMsg: 'Login field was not displayed',
        })

        await browser.$('//*[@id="login_field"]').setValue(auth.login)

        await browser.$('//*[@id="password"]').waitForDisplayed({
            timeoutMsg: 'Password was not displayed',
        })

        await browser.$('//*[@id="password"]').setValue(auth.invalidPassword)

        await browser.$('//*[@type="submit"]').waitForClickable({
            timeoutMsg: 'Submit was not displayed',
        })

        await browser.$('//*[@type="submit"]').click()

        const isDisplayedElement: boolean = await browser.$('//*[@id="js-flash-container"]').isDisplayed()

        expect(isDisplayedElement).toEqual(true)
    })

    it('#4 Forgot password', async () => {
        await browser.$('//*[@id="login"]').waitForDisplayed({
            timeoutMsg: 'Login form was not displayed',
        })

        await browser.$('//*[@id="forgot-password"]').waitForDisplayed({
            timeoutMsg: 'Forgot-password was not displayed',
        })

        await browser.$('//*[@id="forgot-password"]').click()

        const isDisplayedElement: boolean = await browser.$('//*[@id="forgot_password_form"]').isDisplayed()

        expect(isDisplayedElement).toEqual(true)
    })

    afterEach(async () => {
        await browser.reloadSession()
    })
})