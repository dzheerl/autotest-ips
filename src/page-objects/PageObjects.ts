import { Reporter } from "../common/reporter/Reporter"

class PageObject {
    protected browser: WebdriverIO.Browser
    protected url: string = 'https://github.com/'

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser
    }

    public async open(): Promise<void> {
        Reporter.addStep(`Открыть страницу: ${this.url}`)
        await this.browser.url(this.url)
    }
}

export {
    PageObject
}