import { ChainablePromiseElement } from 'webdriverio'
import { PageObject } from '../../page-objects/PageObjects'
import { IssueModel } from '../model/issues.model'

class IssuesPage extends PageObject {
    protected url: string = 'https://github.com/TestUserIps6/qwert123/issues'

    constructor(browser: WebdriverIO.Browser) {
        super(browser)
    }

    public async createIssue(issue: IssueModel): Promise<void> {
        await this.open()
        await this.clickButtonNewIssue()
        await this.setTitleNewIssue(issue)
        await this.setDescriptionNewIssueForm(issue)
        await this.clickButtonSubmitNewIssue()
    }

    public async clickButtonNewIssue(): Promise<void> {
        await this.getButtonNewIssue().waitForClickable({ //ставить clickable
            timeoutMsg: 'Button New Issue was not Clickable'
        })
        await this.getButtonNewIssue().click()
    }


    public async setTitleNewIssue(issue: IssueModel): Promise<void> { // вопрос
        await this.getTitleForm().waitForDisplayed({
            timeoutMsg: 'Title form was not displayed'
        })
        await this.getTitleForm().setValue(issue.title)
    }


    public async setDescriptionNewIssueForm(issue: IssueModel): Promise<void> { // Вопрос: здесь нужно использовать модель или можно вот так
        await this.getDescriptionForm().waitForDisplayed({
            timeoutMsg: 'Description form was not displayed'
        })
        await this.getDescriptionForm().setValue(issue.body!)
    }

    public async clickButtonSubmitNewIssue(): Promise<void> {
        await this.getButtonSubmitNewIssue().waitForClickable({
            timeoutMsg: 'Submit New Issue Button was not displayed'
        })
        await this.getButtonSubmitNewIssue().click()
    }

    public async setSearch(issue: IssueModel): Promise<void> {
        await this.getIssueSearch().waitForDisplayed({
            timeoutMsg: 'Title Issue was not Displayed',
        })
        await this.getIssueSearch().setValue(issue.title)
        await browser.keys('Enter')
    }

    public async getLabelValue(nameLabel: string): Promise<boolean> {
        return await this.getLabel(nameLabel).isExisting()
    }

    public async isIssueExsist(issue: IssueModel): Promise<boolean> {
        return this.getTitleOpenIssue(issue.title).isExisting()
    }

    private getButtonNewIssue(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$("//*[@class='application-main ']//*[contains(@class, 'ml-3')]")
    }

    private getTitleForm(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="issue_title"]')
    }

    private getDescriptionForm(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="issue_body"]')
    }

    private getButtonSubmitNewIssue(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$("//div[@class='Layout-main']//button[@type='submit']")
    }

    private getIssueSearch(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$("//*[contains(@class, 'subnav-search')]//*[@type='text']")
    }

    private getTitleOpenIssue(issueTitle: string): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$(`//*[text()="${issueTitle}"]`)
    }

    private getLabel(nameLabel: string): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$(`//*[@data-name="${nameLabel}"]`)
    }
}

export {
    IssuesPage
}