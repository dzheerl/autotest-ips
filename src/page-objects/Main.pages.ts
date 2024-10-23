import { PageObject } from './PageObjects'
import { ChainablePromiseArray, ChainablePromiseElement } from 'webdriverio'

class MainPage extends PageObject {
    private getUserLogin(): ChainablePromiseElement<WebdriverIO.Element> {
        return browser.$('//form[@action="/sessions/verified-device"] | //*[@data-login="TestUserIps"]')
    }

    public isDisplayedUserLogin(): Promise<boolean> {
        return this.getUserLogin().isDisplayed()
    }
}

export {
    MainPage
}