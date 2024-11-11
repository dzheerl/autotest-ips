import { ChainablePromiseElement } from 'webdriverio'
import { PageObject } from '../../page-objects/PageObjects'

class LoginPage extends PageObject {
    protected url: string = 'https://github.com/login'

    constructor(browser: WebdriverIO.Browser) {
        super(browser)
    }

    private getLoginForm(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="login"]')
    }

    private getLoginField(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="login_field"]')
    }

    private getPasswordField(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="password"]')
    }

    private getSubmitButton(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@type="submit"]')
    }

    public async setLogin(login: string): Promise<void> {
        await this.getLoginField().waitForDisplayed({
            timeoutMsg: 'Login field was not displayed',
        })
        await this.getLoginField().setValue(login)
    }

    public async setPassword(password: string): Promise<void> {
        await this.getPasswordField().waitForDisplayed({
            timeoutMsg: 'Password was not displayed',
        })

        await this.getPasswordField().setValue(password)
    }

    public async submit(): Promise<void> {
        await this.getSubmitButton().waitForDisplayed({
            timeoutMsg: 'Submit was not displayed',
        })

        await this.getSubmitButton().click()
    }

    public async waitForDisplayedLoginForm(): Promise<void> {
        await this.getLoginForm().waitForDisplayed({
            timeoutMsg: 'Login form was not displayed',
        })
    }


    public async login(auth: { login: string, password: string }): Promise<void> {
        await this.waitForDisplayedLoginForm()
        await this.setLogin(auth.login)
        await this.setPassword(auth.password)
        await this.submit()
    }
}

export {
    LoginPage
}