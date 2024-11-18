import { ChainablePromiseElement } from 'webdriverio'
import { PageObject } from '../../page-objects/PageObjects'
import { IssueData } from '../data/issues.data'
import { IssueModel } from '../model/issues.model'

class IssuesPage extends PageObject {
    protected url: string = 'https://github.com/TestUserIps3/qwert123/issues'

    constructor(browser: WebdriverIO.Browser) {
        super(browser)
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

    public async waitForDisplayedgetTitleForm(): Promise<void> {
        await this.getTitleForm().waitForDisplayed({
            timeoutMsg: 'Title form was not displayed',
        })
    }

    public async setTitleNewIssue(issue: IssueModel): Promise<void> { // вопрос
        await this.getTitleForm().waitForDisplayed({
            timeoutMsg: 'Title form was not displayed'
        })
        await this.getTitleForm().setValue(issue.title)
    }

    public async waitForDisplayedgetDescriptionForm(): Promise<void> {
        await this.getDescriptionForm().waitForDisplayed({
            timeoutMsg: 'Description form was not displayed',
        })
    }

    public async setDescriptionNewIssueForm(issue: IssueModel): Promise<void> { // Вопрос: здесь нужно использовать модель или можно вот так
        await this.getDescriptionForm().waitForDisplayed({
            timeoutMsg: 'Description form was not displayed'
        })
        await this.getDescriptionForm().setValue(issue.description!)
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

    public async getFirstDescriptionText(): Promise<string> {
        await this.getFirstDescriptionIssuse().waitForDisplayed({
            timeoutMsg: 'Description Issue was not displayed',
        })
        return this.getFirstDescriptionIssuse().getText()
    }

    public async getLastCommentText(): Promise<string> {
        await this.browser.pause(1000)
        await this.getLastComment().waitForDisplayed({
            timeoutMsg: 'Description Issue was not displayed',
        })
        return this.getLastComment().getText()
    }

    public async clickEditTitle(): Promise<void> {
        await this.getEditTitle().waitForClickable({
            timeoutMsg: 'Title Issue was not Clickable',
        })
        await this.getEditTitle().click()
    }

    public async getTitleIssueValue(): Promise<string> {
        await this.getTitleIssueForm().waitForDisplayed({
            timeoutMsg: 'Title Issue was not Displayed',
        })
        return this.getTitleIssueForm().getText()
    }

    public async setTitleIssue(issue: IssueModel): Promise<void> {
        await this.getTitleIssueForm().waitForDisplayed({
            timeoutMsg: 'Title Issue was not Displayed',
        })
        await this.getTitleIssueForm().setValue(issue.title)
    }

    public async updateTitle(): Promise<void> {
        await this.getTitleIssueForm().waitForClickable({
            timeoutMsg: 'Title Issue was not Clickable',
        })
        await this.getButtonUpdateTitle().click()
    }

    public async getTextTimeLineItemLast(): Promise<string> {
        await this.getTimeLineItemLastElement().waitForDisplayed({
            timeoutMsg: 'Time Line Item Last Element was not Displayed',
        })
        return this.getTimeLineItemLastElement().getText()
    }

    public async clickKebabMenuDescription(): Promise<void> {
        await this.getKebabDescription().waitForClickable({
            timeoutMsg: 'Kebab Description Issue was not Clickable',
        })
        await this.getKebabDescription().click()
    }

    public async clickEditDescription(): Promise<void> {
        await this.getButtonEditDescription().waitForDisplayed({
            timeoutMsg: 'Button Edit Description Issue was not Displayed',
        })
        await this.getButtonEditDescription().waitForClickable({
            timeoutMsg: 'Button Edit Description Issue was not Clickable',
        })
        // await browser.pause(3000) // Добавил из - за того, что клик происходил в другой элемент
        await this.getButtonEditDescription().click()
    }

    public async setUpdatedDescription(issue: IssueModel): Promise<void> {
        await this.getTextAreaDescription().waitForDisplayed({
            timeoutMsg: 'Text Area Description Issue was not Displayed',
        })
        await this.getTextAreaDescription().setValue(issue.description) //либо
    }

    public async getDescriptionText(): Promise<string> {
        await this.getDescription().waitForDisplayed({
            timeoutMsg: 'Description Issue was not Displayed',
        })
        return await this.getDescription().getText()
    }

    public async getAltImg(): Promise<string> {
        await this.getAttachImg().waitForExist({
            timeoutMsg: 'Description Issue was not Displayed',
        })
        return await this.getAttachImg().getAttribute("alt")
    }

    public async saveUpdatedDescription(): Promise<void> {
        await this.getButtonUpdatedDescription().waitForClickable({
            timeoutMsg: 'save updated secription was not Clickable',
        })
        await this.getButtonUpdatedDescription().click()
    }

    public async fileAtachErrorExist(): Promise<boolean> { //добавить is (нэйминг), 1- глагол
        await this.getFileAttachError().waitForDisplayed({ //wait for displayed
            timeoutMsg: 'Description Issue was not Displayed',
        })
        return await this.getFileAttachError().isExisting()
    }

    public async uploadFile(filePath: string): Promise<void> {
        await this.getInputFile().waitForExist({
            timeoutMsg: 'File input field was not existed',
        })
        await showHiddenFileInput(this.browser)
        const file: string = await this.browser.uploadFile(filePath)
        await this.getInputFile().setValue(file)
        await this.browser.pause(3000)
    }

    public async getTextLockConversation(): Promise<string> {
        await this.getButtonLockConversation().waitForDisplayed({
            timeoutMsg: 'Description Issue was not displayed',
        })
        return this.getButtonLockConversation().getText()
    }

    public async getTextUnlockConversation(): Promise<string> {
        await this.getButtonLockConversation().waitForDisplayed({
            timeoutMsg: 'Description Issue was not displayed',
        })
        return this.getButtonLockConversation().getText()
    }

    public async lockConversation(): Promise<void> {
        await this.getButtonLockConversation().waitForClickable({
            timeoutMsg: 'lock Conversation was not Clickable',
        })
        await this.getButtonLockConversation().click()
    }

    public async acceptLockConversation(): Promise<void> {
        await this.getButtonAcceptLockConversation().waitForClickable({
            timeoutMsg: 'Accept lock Conversation was not Clickable',
        })
        await this.getButtonAcceptLockConversation().click()
    }

    public async closeIssue(): Promise<void> {
        await this.getButtonCloseIssue().waitForDisplayed({
            timeoutMsg: 'Button Close Issue was not Displayed',
        })
        await this.getButtonCloseIssue().waitForClickable({
            timeoutMsg: 'Button Close Issue was not Clickable',
        })
        await this.getButtonCloseIssue().click()
    }

    public async clickDeleteIssue(): Promise<void> {
        await this.getButtonDeleteIssue().waitForDisplayed({
            timeoutMsg: 'Button delete Issue was not Displayed',
        })
        await this.getButtonDeleteIssue().waitForClickable({
            timeoutMsg: 'Button delete Issue was not Clickable',
        })
        await this.getButtonDeleteIssue().click()
    }

    public async acceptDeleteIssue(): Promise<void> {
        // await this.browser.pause(500)
        await this.getAcceptDeleteIssue().waitForDisplayed({
            timeoutMsg: 'Accept delete Issue was not Displayed',
        })
        await this.getAcceptDeleteIssue().waitForClickable({
            timeoutMsg: 'Accept delete Issue was not Clickable',
        })
        await this.getAcceptDeleteIssue().click()
    }

    public async setTextComment(issue: IssueModel): Promise<void> {
        await this.getTextAreaComment().waitForDisplayed({
            timeoutMsg: 'Comment form was not displayed'
        })
        await this.getTextAreaComment().setValue(issue.comment!)
    }

    public async addComment(): Promise<void> {
        await this.getButtonAddComment().waitForDisplayed({
            timeoutMsg: 'Button add comment was not Displayed',
        })
        await this.getButtonAddComment().waitForClickable({
            timeoutMsg: 'Button add comment was not Clickable',
        })
        await this.getButtonAddComment().click()
    }

    public async setSearch(issue: IssueModel): Promise<void> {
        await this.getIssueSearch().waitForDisplayed({
            timeoutMsg: 'Title Issue was not Displayed',
        })
        await this.getIssueSearch().setValue(issue.title)
        await browser.keys('Enter');
    }

    public async isIssueExsist(issue: IssueModel): Promise<boolean> {
        await this.getTitleOpenIssue(issue.title).waitForDisplayed({
            timeoutMsg: 'Issue was not Displayed',
        })
        return this.getTitleOpenIssue(issue.title).isExisting()
    }

    public async createIssue(issue: IssueModel): Promise<void> {
        await this.open()
        await this.clickButtonNewIssue()
        await this.setTitleNewIssue(issue)
        await this.setDescriptionNewIssueForm(issue)
        await this.clickButtonSubmitNewIssue()
    }

    public async deleteIssue(issue: IssueModel): Promise<void> {
        await this.browser.url(issue.url!)
        await this.clickDeleteIssue()
        // await this.browser.pause(3000)
        await this.acceptDeleteIssue()
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

    private getTitileIssue(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$("//div[@class='gh-header-show ']//bdi")
    }

    private getFirstDescriptionIssuse(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$("(//*[@class='edit-comment-hide'])[1]")
    }

    private getLastComment(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$("(//*[@class='edit-comment-hide'])[last()]");
    }

    private getEditTitle(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$("//div[@class='gh-header-show ']//span[@class='Button-content']/span[@class='Button-label']")
    }

    private getTitleIssueForm(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$("//*[@id='issue_title']")
    }

    private getButtonUpdateTitle(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$("//*[@data-disable-with='Updating']")
    }

    private getTimeLineItemLastElement(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$("(//*[@class='TimelineItem-body'])[last()]")
    }

    private getButtonEditDescription(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$("((//*[contains(@class, 'timeline-comment-header')])[1]//*[contains(@aria-label, 'Edit comment')])")
    }

    private getKebabDescription(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$("(//*[contains(@class, 'timeline-comment-header')])[1]//summary[contains(@class, 'timeline-comment-action')]")
    }

    private getAttachImg(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$("(//*[@class='edit-comment-hide'])[1]//p[@dir='auto']//img")
    }

    private getFileAttachError(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$("(//*[@class='file-attachment-errors'])[1]")
    }

    private getDescription(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$("(//*[@class='edit-comment-hide'])[1]//p[@dir='auto']")
    }

    private getTextAreaDescription(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$("(//*[@name='issue[body]'])[1]")
    }

    private getButtonUpdatedDescription(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$("//form//div/div/*[@type='submit']")
    }

    private getInputFile(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$("(//*[@type='file'])[1]")
    }

    private getButtonLockConversation(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$("//*[@class='discussion-sidebar-item']//*[@role='button']")
    }

    private getButtonAcceptLockConversation(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$("//*[@class='discussion-sidebar-item']//*[@class='Box-footer']/button")
    }

    private getButtonCloseIssue(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$("//*[@name='comment_and_close']")
    }

    private getAcceptDeleteIssue(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$("//*[@class='edit_issue']//button")
    }

    private getButtonDeleteIssue(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$("(//*[contains(@class, 'details-reset')])[last()]//summary")
    }

    private getTextAreaComment(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@name="comment[body]"]')
    }

    private getButtonAddComment(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$("(//*[@class='mt-2']//*[@type='submit'])[last()]")
    }

    private getIssueSearch(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$("//*[contains(@class, 'subnav-search')]//*[@type='text']")
    }

    private getTitleOpenIssue(issueTitle: string): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$(`//*[text()="${issueTitle}"]`)
    }
}

async function showHiddenFileInput(browser: WebdriverIO.Browser): Promise<void> {
    await browser.execute(() => {
        const htmlElement = document.querySelector('[type="file"]') as HTMLElement
        htmlElement.style.cssText = 'display:block !important; opacity: 1; position: inherit;'
    })
}

export {
    IssuesPage
}
