import { ChainablePromiseElement } from 'webdriverio'
import { PageObject } from '../../page-objects/PageObjects'
import { IssueData } from '../data/issues.data'
import { IssueModel } from '../model/issues.model'

class OpenIssuesPage extends PageObject {
    protected url: string = 'https://github.com/TestUserIps2/qwert123/issues'

    constructor(browser: WebdriverIO.Browser) {
        super(browser)
    }
    public async setSearch(issue: IssueModel): Promise<void> {
        await this.getIssueSearch().waitForDisplayed({
            timeoutMsg: 'Title Issue was not Displayed',
        })
        await this.getIssueSearch().setValue(issue.title)
        await browser.keys('Enter');
    }

    private getIssueSearch(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$("//*[contains(@class, 'subnav-search')]//*[@type='text']")
    }

    public async issueIsExsist(issue: IssueModel): Promise<boolean> {
        await this.browser.refresh()
        return await this.getTitleOpenIssue(issue.title).isExisting()
    }

    private getTitleOpenIssue(issueTitle: string): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$(`//*[text()="${issueTitle}"]`)
    }
}

export {
    OpenIssuesPage
}