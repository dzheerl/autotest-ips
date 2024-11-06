import { ChainablePromiseElement } from 'webdriverio'
import { PageObject } from './PageObjects'

class ProfilePage extends PageObject {
    protected url: string = 'https://github.com/TestUserIps2'

    constructor(browser: WebdriverIO.Browser) {
        super(browser)
    }

    public async getProfileNameText(): Promise<string> {
        await this.getProfileName().waitForDisplayed({
            timeoutMsg: 'Profile name was not displayed'
        })
        return await this.getProfileName().getText()
    }

    private getProfileName(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@class="vcard-names "]/span')
    }

    public async getProfileBioText(): Promise<string> {
        await this.getProfileBio().waitForDisplayed({
            timeoutMsg: 'Bio was not displayed'
        })
        return await this.getProfileBio().getText()
    }

    private getProfileBio(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@class="p-note"]')
    }

    public async getProfileEmailText(): Promise<string> {
        await this.getProfileEmail().waitForExist({
            timeoutMsg: 'Email was not displayed'
        })
        return await this.getProfileEmail().getText()
    }

    private getProfileEmail(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@itemprop="email"]/a')
    }

    public async getPonounsText(): Promise<string> {
        await this.getPronouns().waitForExist({
            timeoutMsg: 'Ponouns was not displayed'
        })
        return await this.getPronouns().getText()
    }

    private getPronouns(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[contains(@class, "p-nickname")]/span')
    }
}

export {
    ProfilePage
}