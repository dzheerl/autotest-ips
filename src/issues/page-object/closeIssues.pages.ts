import { ChainablePromiseElement } from 'webdriverio'
import { PageObject } from '../../page-objects/PageObjects'
import { IssueData } from '../data/issues.data'
import { IssueModel } from '../model/issues.model'

class CloseIssuesPage extends PageObject {
    protected url: string = 'https://github.com/TestUserIps3/qwert123/issues?q=is%3Aissue+is%3Aclosed'

    constructor(browser: WebdriverIO.Browser) {
        super(browser)
    }

    public async isIssueExsist(issue: IssueModel): Promise<boolean> {
        await this.browser.refresh()
        return await this.getTitleCloseIssue(issue.title).isExisting()
    }

    private getTitleCloseIssue(issueTitle: string): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$(`//*[text()="${issueTitle}"]`)
    }
}

export {
    CloseIssuesPage
}