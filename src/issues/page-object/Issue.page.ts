import { ChainablePromiseElement } from 'webdriverio'
import { PageObject } from '../../page-objects/PageObjects'
import { IssueModel } from '../model/issues.model'

class IssuePage extends PageObject {
    constructor(browser: WebdriverIO.Browser, url: string) {
        super(browser)
        this.url = url
    }

    public async waitForDisplayedButtonNewIssue(): Promise<void> {
        await this.getButtonNewIssue().waitForDisplayed({
            timeoutMsg: 'Button New Issue was not displayed',
        })
    }

    public async waitForDisplayedgetTitleForm(): Promise<void> {
        await this.getTitleForm().waitForDisplayed({
            timeoutMsg: 'Title form was not displayed',
        })
    }

    public async waitForDisplayedgetDescriptionForm(): Promise<void> {
        await this.getDescriptionForm().waitForDisplayed({
            timeoutMsg: 'Description form was not displayed',
        })
    }

    public async waitForDisplayedSubmitNewIssueButton(): Promise<void> {
        await this.getButtonSubmitNewIssue().waitForDisplayed({
            timeoutMsg: 'Submit New Issue Button was not displayed',
        })
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
        await this.getTextAreaDescription().setValue(issue.body!) //либо
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
            timeoutMsg: 'save updated description was not Clickable',
        })
        await this.getButtonUpdatedDescription().click()
    }

    public async fileAtachErrorExist(): Promise<boolean> { //добавить is (нэйминг), 1- глагол
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
        await this.getButtonAddComment().waitForClickable({
            timeoutMsg: 'Button add comment was not Clickable',
        })
        await this.getButtonAddComment().click()
    }

    public async deleteIssue(issue: IssueModel): Promise<void> {
        await this.browser.url(issue.htmlUrl!)
        await this.clickDeleteIssue()
        // await this.browser.pause(3000)
        await this.acceptDeleteIssue()
    }

    public async callLabelMenu(): Promise<void> {
        await this.getLabelSelectMenu().waitForDisplayed({
            timeoutMsg: 'call label menu was not Displayed',
        })
        console.log('типа нашли элемент котрого нет')
        await this.getLabelSelectMenu().waitForClickable({
            timeoutMsg: 'call label menu was not Clickable',
        })
        await this.getLabelSelectMenu().click()
    }

    public async chooseLabel(name: string): Promise<void> {
        await this.getLabelMenuItem(name).waitForClickable({
            timeoutMsg: 'Label menu item was not Clickable',
        })
        await this.getLabelMenuItem(name).click()
        await this.browser.$('body').click()
        await this.browser.pause(3000)
        // await this.browser.refresh()
        // await this.waitChooseLabel().waitForDisplayed()
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

    private getLabelSelectMenu(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('(//*[@id="labels-select-menu"])')
    }

    private getLabelMenuItem(name: string): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$(`//*[contains(@data-prio-filter-value, "${name}")]`)
    }

    private waitChooseLabel(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//div[contains(@class, "js-issue-labels")]/a')
    }
}

async function showHiddenFileInput(browser: WebdriverIO.Browser): Promise<void> {
    await browser.execute(() => {
        const htmlElement = document.querySelector('[type="file"]') as HTMLElement
        htmlElement.style.cssText = 'display:block !important; opacity: 1; position: inherit;'
    })
}

export {
    IssuePage
}
