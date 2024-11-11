import { ChainablePromiseElement } from 'webdriverio'
import { PageObject } from '../../page-objects/PageObjects'
import { IssueData } from '../data/issues.data'
import { IssueModel } from '../model/issues.model'

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
        await this.getButtonNewIssue().waitForClickable({
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

    public async setTitle(issue: IssueModel): Promise<void> { // вопрос
        await this.getTitleForm().waitForDisplayed({
            timeoutMsg: 'Title form was not displayed'
        })
        await this.getTitleForm().setValue(issue.title)
    }

    private getDescriptionForm(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="issue_body"]')
    }

    public async waitForDisplayedgetDescriptionForm(): Promise<void> {
        await this.getDescriptionForm().waitForDisplayed({
            timeoutMsg: 'Description form was not displayed',
        })
    }

    public async setDescription(description: string): Promise<void> { // Вопрос: здесь нужно использовать модель или можно вот так
        await this.getDescriptionForm().waitForDisplayed({
            timeoutMsg: 'Description form was not displayed'
        })
        await this.getDescriptionForm().setValue(description)
    }

    private getButtonSubmitNewIssue(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$("//div[@class='Layout-main']//button[@type='submit']")
    }

    public async waitForDisplayedSubmitNewIssueButton(): Promise<void> {
        await this.getButtonSubmitNewIssue().waitForDisplayed({
            timeoutMsg: 'Submit New Issue Button was not displayed',
        })
    }

    public async clickButtonSubmitNewIssue(): Promise<void> {
        await this.getButtonSubmitNewIssue().waitForClickable({
            timeoutMsg: 'Submit New Issue Button was not displayed'
        })
        await this.getButtonSubmitNewIssue().click()
    }

    private getTitileIssue(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$("//div[@class='gh-header-show ']//bdi")
    }

    public async waitForDisplayedTitleIssue(): Promise<void> {
        await this.getTitileIssue().waitForDisplayed({
            timeoutMsg: 'Title Issue was not displayed',
        })
    }

    public async getTitleIssueText(): Promise<string> {
        await this.getTitileIssue().waitForDisplayed({
            timeoutMsg: 'Title Issue was not displayed',
        })
        return this.getTitileIssue().getText()
    }

    private getEditTitle(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$$("//div[@class='gh-header-show ']//span[@class='Button-content']/span[@class='Button-label']").
    }

}

export {
    IssuesPage
}
