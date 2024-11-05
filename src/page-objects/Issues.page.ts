import { ChainablePromiseElement } from 'webdriverio'
import { PageObject } from '../../src/page-objects/PageObjects'
import { IssueData } from '../data/issues.data'

class IssuesPage extends PageObject {
    protected url: string = 'https://github.com/TestUserIps2/test123/issues'

    constructor(browser: WebdriverIO.Browser) {
        super(browser)
    }

    private getButtonNewIssue(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@data-hotkey="c"]')
    }

    public async waitForDisplayedButtonNewIssue(): Promise<void> {
        await this.getButtonNewIssue().waitForDisplayed({
            timeoutMsg: 'Button New Issue was not displayed',
        })
    }

    public async clickButtonNewIssue(): Promise<void> {
        await this.getButtonNewIssue().waitForDisplayed({
            timeoutMsg: 'Button New Issue was not displayed'
        })
        await this.getButtonNewIssue().click()
    }

    private getTitleForm(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="issue_title"]')
    }

    public async waitForDisplayedgetTitleForm(): Promise<void> {
        await this.getTitleForm().waitForDisplayed({
            timeoutMsg: 'Title form was not displayed',
        })
    }

    public async setTitle(titleValue: string): Promise<void> { // вопрос
        await this.getTitleForm().waitForDisplayed({
            timeoutMsg: 'Title form was not displayed'
        })
        await this.getTitleForm().setValue(titleValue)
    }

    public async getTitleValue(): Promise<string> {
        let titleValue: string = await this.getTitleForm().getValue()
        return titleValue
    }

    private getDescriptionForm(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="issue_body"]')
    }

    public async waitForDisplayedgetDescriptionForm(): Promise<void> {
        await this.getDescriptionForm().waitForDisplayed({
            timeoutMsg: 'Description form was not displayed',
        })
    }

    public async setDescription(descriptionValue: string): Promise<void> { // Вопрос
        await this.getDescriptionForm().waitForDisplayed({
            timeoutMsg: 'Description form was not displayed'
        })
        await this.getDescriptionForm().setValue(descriptionValue) // добавил ! чтобы не ругалась ide
    }

    public async getDescriptionValue(): Promise<string> {
        let descriptionValue: string = await this.getDescriptionForm().getValue()
        return descriptionValue
    }

    private getButtonSubmitNewIssue(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//button[contains(text(), "Submit new issue")]')
    }

    public async waitForDisplayedgetSubmitNewIssueButton(): Promise<void> {
        await this.getButtonSubmitNewIssue().waitForDisplayed({
            timeoutMsg: 'Submit New Issue Button was not displayed',
        })
    }

    public async clickButtonSubmitNewIssue(): Promise<void> {
        await this.getButtonSubmitNewIssue().waitForDisplayed({
            timeoutMsg: 'Submit New Issue Button was not displayed'
        })
        await this.getButtonSubmitNewIssue().click()
    }

    private getTitleIssue(titleName: string): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$(`//bdi[contains(text(), "${titleName}")]`)
    }

    public async waitForDisplayedgetTitleIssue(titleName: string): Promise<void> {
        await this.getTitleIssue(titleName).waitForDisplayed({
            timeoutMsg: 'Title issue was not displayed',
        })
    }

    public async getTitleIssueValue(titleName: string): Promise<string> {
        let titleIssueValue: string = await this.getTitleIssue(titleName).getText()
        return titleIssueValue
    }

    private getDescriptionIssue(descriptionValue: string): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$(`//p[contains(text(), "${descriptionValue}")]`)
    }

    public async waitForDisplayedgetDescriptionIssue(descriptionValue: string): Promise<void> {
        await this.getDescriptionIssue(descriptionValue).waitForDisplayed({
            timeoutMsg: 'Description value  was not displayed',
        })
    }

    public async getDescriptionIssueValue(descriptionIssue: string): Promise<string> {
        let descriptionValue: string = await this.getDescriptionIssue(descriptionIssue).getText()
        return descriptionValue
    }

}

export {
    IssuesPage
}
