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

    public async setTitleNewIssue(issue: IssueModel): Promise<void> { // вопрос
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

    public async setDescriptionNewIssueForm(issue: IssueModel): Promise<void> { // Вопрос: здесь нужно использовать модель или можно вот так
        await this.getDescriptionForm().waitForDisplayed({
            timeoutMsg: 'Description form was not displayed'
        })
        await this.getDescriptionForm().setValue(issue.description)
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

    public async getFirstDescriptionText(): Promise<string> {
        await this.getFirstDescriptionIssuse().waitForDisplayed({
            timeoutMsg: 'Description Issue was not displayed',
        })
        return this.getFirstDescriptionIssuse().getText()
    }

    private getFirstDescriptionIssuse(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$("(//*[@class='edit-comment-hide'])[1]")
    }

    public async getLastCommentText(): Promise<string> {
        await this.getLastComment().waitForDisplayed({
            timeoutMsg: 'Description Issue was not displayed',
        })
        return this.getLastComment().getText()
    }

    private getLastComment(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$("(//*[@class='edit-comment-hide'])[last()]");
    }

    public async clickEditTitle(): Promise<void> {
        await this.getEditTitle().waitForClickable({
            timeoutMsg: 'Title Issue was not Clickable',
        })
        await this.getEditTitle().click()
    }

    private getEditTitle(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$("//div[@class='gh-header-show ']//span[@class='Button-content']/span[@class='Button-label']")
    }

    public async getTitleIssueValue(): Promise<string> {
        await this.getTitleIssueForm().waitForDisplayed({
            timeoutMsg: 'Title Issue was not Displayed',
        })
        return this.getTitleIssueForm().getText()
    }

    private getTitleIssueForm(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$("//*[@id='issue_title']")
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

    private getButtonUpdateTitle(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$("//*[@data-disable-with='Updating']")
    }

    private getTimeLineItemLastElement(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$("(//*[@class='TimelineItem-body'])[last()]")
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

    private getButtonEditDescription(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$("((//*[contains(@class, 'timeline-comment-header')])[1]//*[contains(@aria-label, 'Edit comment')])")
    }

    private getKebabDescription(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$("(//*[contains(@class, 'timeline-comment-header')])[1]//summary[contains(@class, 'timeline-comment-action')]")
    }

    public async setUpdatedDescription(issue: IssueModel): Promise<void> {
        await this.getTextAreaDescription().waitForDisplayed({
            timeoutMsg: 'Text Area Description Issue was not Displayed',
        })
        await this.getTextAreaDescription().setValue(issue.description)
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

    private getAttachImg(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$("(//*[@class='edit-comment-hide'])[1]//p[@dir='auto']//img")
    }

    public async fileAtachErrorExist(): Promise<boolean> {
        await this.getFileAttachError().waitForExist({
            timeoutMsg: 'Description Issue was not Displayed',
        })
        return await this.getFileAttachError().isExisting()
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

    public async saveUpdatedDescription(): Promise<void> {
        await this.getButtonUpdatedDescription().waitForClickable({
            timeoutMsg: 'save updated secription was not Clickable',
        })
        await this.getButtonUpdatedDescription().click()
    }

    private getButtonUpdatedDescription(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$("//form//div/div/*[@type='submit']")
    }

    public async uploadFile(filePath: string): Promise<void> {
        await this.getInputFile().waitForExist({
            timeoutMsg: 'File input field was not existed',
        })
        await showHiddenFileInput(this.browser)
        const file: string = await this.browser.uploadFile(filePath)
        await this.getInputFile().setValue(file)
    }

    private getInputFile(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$("(//*[@type='file'])[1]")
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
