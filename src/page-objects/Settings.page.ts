import { ChainablePromiseElement } from 'webdriverio'
import { PageObject } from './PageObjects'
import { getRandom } from '../common/tools'


class settingsPage extends PageObject {
    protected url: string = 'https://github.com/settings/profile'
    constructor(browser: WebdriverIO.Browser) {
        super(browser)
    }

    private getProfileNameForm(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@name="user[profile_name]"]')
    }

    public async setProfileName(profileName: string): Promise<void> {
        await this.getProfileNameForm().waitForDisplayed({
            timeoutMsg: 'Profile Name field was not displayed'
        })
        await this.getProfileNameForm().setValue(profileName)
    }
}