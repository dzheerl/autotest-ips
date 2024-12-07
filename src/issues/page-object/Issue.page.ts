import { ChainablePromiseElement } from 'webdriverio'
import { PageObject } from '../../page-objects/PageObjects'
import { IssueModel } from '../model/issues.model'
import { Reporter } from '../../common/reporter/Reporter'

class IssuePage extends PageObject {
    constructor(browser: WebdriverIO.Browser, url: string) {
        super(browser)
        this.url = url
    }

    public async waitForDisplayedButtonNewIssue(): Promise<void> {
        Reporter.addStep('Подождать отображения кнопки New Issue')
        await this.getButtonNewIssue().waitForDisplayed({
            timeoutMsg: 'Button New Issue was not displayed',
        })
    }

    public async waitForDisplayedgetTitleForm(): Promise<void> {
        Reporter.addStep('Подождать отображения поля Title')
        await this.getTitleForm().waitForDisplayed({
            timeoutMsg: 'Title form was not displayed',
        })
    }

    public async waitForDisplayedgetDescriptionForm(): Promise<void> {
        Reporter.addStep('Подождать отображения поля Description')
        await this.getDescriptionForm().waitForDisplayed({
            timeoutMsg: 'Description form was not displayed',
        })
    }

    public async waitForDisplayedSubmitNewIssueButton(): Promise<void> {
        Reporter.addStep('Подождать отображения кнопки New Issue')
        await this.getButtonSubmitNewIssue().waitForDisplayed({
            timeoutMsg: 'Submit New Issue Button was not displayed',
        })
    }

    public async waitForDisplayedTitleIssue(): Promise<void> {
        Reporter.addStep('Подождать отображения Title')
        await this.getTitileIssue().waitForDisplayed({
            timeoutMsg: 'Title Issue was not displayed',
        })
    }

    public async getTitleIssueText(): Promise<string> {
        Reporter.addStep('Получить значение Title')
        await this.getTitileIssue().waitForDisplayed({
            timeoutMsg: 'Title Issue was not displayed',
        })
        return this.getTitileIssue().getText()
    }

    public async getFirstDescriptionText(): Promise<string> {
        Reporter.addStep('Получить значение Description')
        await this.getFirstDescriptionIssuse().waitForDisplayed({
            timeoutMsg: 'Description Issue was not displayed',
        })
        return this.getFirstDescriptionIssuse().getText()
    }

    public async getLastCommentText(): Promise<string> {
        Reporter.addStep('Получить значение комментария')
        await this.browser.pause(1000)
        await this.getLastComment().waitForDisplayed({
            timeoutMsg: 'Description Issue was not displayed',
        })
        return this.getLastComment().getText()
    }

    public async clickEditTitle(): Promise<void> {
        Reporter.addStep('Подождать отображения кнопки Edit Title')
        await this.getEditTitle().waitForClickable({
            timeoutMsg: 'Title Issue was not Clickable',
        })
        await this.getEditTitle().click()
    }

    public async getTitleIssueValue(): Promise<string> {
        Reporter.addStep('Получить значение измененного title')
        await this.getTitleIssueForm().waitForDisplayed({
            timeoutMsg: 'Title Issue was not Displayed',
        })
        return this.getTitleIssueForm().getText()
    }

    public async setTitleIssue(issue: IssueModel): Promise<void> {
        Reporter.addStep(`Ввод значение в title задачи ${issue.title}`)
        await this.getTitleIssueForm().waitForDisplayed({
            timeoutMsg: 'Title Issue was not Displayed',
        })
        await this.getTitleIssueForm().setValue(issue.title)
    }

    public async updateTitle(): Promise<void> {
        Reporter.addStep('Нажать на кнопку обновления задачи')
        await this.getTitleIssueForm().waitForClickable({
            timeoutMsg: 'Title Issue was not Clickable',
        })
        await this.getButtonUpdateTitle().click()
    }

    public async getTextTimeLineItemLast(): Promise<string> {
        Reporter.addStep('Получить последний элемент истории задачи')
        await this.getTimeLineItemLastElement().waitForDisplayed({
            timeoutMsg: 'Time Line Item Last Element was not Displayed',
        })
        return this.getTimeLineItemLastElement().getText()
    }

    public async clickKebabMenuDescription(): Promise<void> {
        Reporter.addStep('Вызов контекстного меню Description')
        await this.getKebabDescription().waitForClickable({
            timeoutMsg: 'Kebab Description Issue was not Clickable',
        })
        await this.getKebabDescription().click()
    }

    public async clickEditDescription(): Promise<void> {
        Reporter.addStep('Вызов редактировния description')
        await this.getButtonEditDescription().waitForClickable({
            timeoutMsg: 'Button Edit Description Issue was not Clickable',
        })
        // await browser.pause(3000) // Добавил из - за того, что клик происходил в другой элемент
        await this.getButtonEditDescription().click()
    }

    public async setUpdatedDescription(issue: IssueModel): Promise<void> {
        Reporter.addStep('Сохранить внесенные изменения в description')
        await this.getTextAreaDescription().waitForDisplayed({
            timeoutMsg: 'Text Area Description Issue was not Displayed',
        })
        await this.getTextAreaDescription().setValue(issue.body!) //либо
    }

    public async getDescriptionText(): Promise<string> {
        Reporter.addStep('Получить текст description после изменений')
        await this.getDescription().waitForDisplayed({
            timeoutMsg: 'Description Issue was not Displayed',
        })
        return await this.getDescription().getText()
    }

    public async getAltImg(): Promise<string> {
        Reporter.addStep('Получить название загруженного изображения')
        await this.getAttachImg().waitForExist({
            timeoutMsg: 'Description Issue was not Displayed',
        })
        return await this.getAttachImg().getAttribute("alt")
    }

    public async saveUpdatedDescription(): Promise<void> {
        Reporter.addStep('Сохранить внесенные изменения в description')
        await this.getButtonUpdatedDescription().waitForClickable({
            timeoutMsg: 'save updated description was not Clickable',
        })
        await this.getButtonUpdatedDescription().click()
    }

    public async fileAtachErrorExist(): Promise<boolean> { //добавить is (нэйминг), 1- глагол
        Reporter.addStep('Получить сообщение об ошибке, если загружен невалидный файл')
        return await this.getFileAttachError().isExisting()
    }

    public async uploadFile(filePath: string): Promise<void> {
        Reporter.addStep('Загрузить файл')
        await this.getInputFile().waitForExist({
            timeoutMsg: 'File input field was not existed',
        })
        await showHiddenFileInput(this.browser)
        const file: string = await this.browser.uploadFile(filePath)
        await this.getInputFile().setValue(file)
        await this.browser.pause(3000)
    }

    public async uploadFileComment(filePath: string): Promise<void> {
        Reporter.addStep('Загрузить файл в комментарий')
        await this.getInputFileComment().waitForExist({
            timeoutMsg: 'File input field was not existed',
        })
        await showHiddenFileInputComment(this.browser)
        const file: string = await this.browser.uploadFile(filePath)
        await this.getInputFileComment().setValue(file)
        await this.browser.pause(3000)
    }

    public async getTextLockConversation(): Promise<string> {
        Reporter.addStep('Подождать кнопку блокировки задачи')
        await this.getButtonLockConversation().waitForDisplayed({
            timeoutMsg: 'Lock Conversation was not displayed',
        })
        return this.getButtonLockConversation().getText()
    }

    public async getTextUnlockConversation(): Promise<string> {
        Reporter.addStep('Подождать кнопку разблокировки задачи')
        await this.getButtonLockConversation().waitForDisplayed({
            timeoutMsg: 'UnLock Conversation was not displayed',
        })
        return this.getButtonLockConversation().getText()
    }

    public async lockConversation(): Promise<void> {
        Reporter.addStep('Блокировать задачу')
        await this.getButtonLockConversation().waitForClickable({
            timeoutMsg: 'lock Conversation was not Clickable',
        })
        await this.getButtonLockConversation().click()
    }

    public async acceptLockConversation(): Promise<void> {
        Reporter.addStep('Подтверить блкировку задачи')
        await this.getButtonAcceptLockConversation().waitForClickable({
            timeoutMsg: 'Accept lock Conversation was not Clickable',
        })
        await this.getButtonAcceptLockConversation().click()
    }

    public async closeIssue(): Promise<void> {
        Reporter.addStep('Закрыть задачи')
        await this.getButtonCloseIssue().waitForClickable({
            timeoutMsg: 'Button Close Issue was not Clickable',
        })
        await this.getButtonCloseIssue().click()
    }

    public async clickDeleteIssue(): Promise<void> {
        Reporter.addStep('Удалить задачи')
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
        Reporter.addStep('Подтвердить удаления задачи')
        await this.getAcceptDeleteIssue().waitForClickable({
            timeoutMsg: 'Accept delete Issue was not Clickable',
        })
        await this.getAcceptDeleteIssue().click()
    }

    public async setTextComment(issue: IssueModel): Promise<void> {
        Reporter.addStep('Получить текст комментария')
        await this.getTextAreaComment().waitForDisplayed({
            timeoutMsg: 'Comment form was not displayed'
        })
        await this.getTextAreaComment().setValue(issue.comment!)
    }

    public async addComment(): Promise<void> {
        Reporter.addStep('Добавить комментарий')
        await this.getButtonAddComment().waitForClickable({
            timeoutMsg: 'Button add comment was not Clickable',
        })
        await this.getButtonAddComment().click()
    }

    public async waitImg(): Promise<void> {
        Reporter.addStep('Подождать отображение загруженной картинки')
        await this.getImgComment().waitForDisplayed({
            timeout: 5000, // Время ожидания (в миллисекундах)
            timeoutMsg: 'Элемент не загрузился за отведенное время',
        });
    }

    public async deleteIssue(issue: IssueModel): Promise<void> {
        await this.browser.url(issue.htmlUrl!)
        await this.clickDeleteIssue()
        // await this.browser.pause(3000)
        await this.acceptDeleteIssue()
    }

    public async callLabelMenu(): Promise<void> {
        Reporter.addStep('Вызов контекстного меню с label')
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
        Reporter.addStep('Выбор label')
        await this.getLabelMenuItem(name).waitForClickable({
            timeoutMsg: 'Label menu item was not Clickable',
        })
        await this.getLabelMenuItem(name).click()
        await this.browser.$('body').click()
        await this.browser.pause(3000)
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

    private getInputFileComment(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$("(//*[@type='file'])[2]")
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

    private getImgComment(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$("//*[@target='_blank']/img")
    }
}

async function showHiddenFileInputComment(browser: WebdriverIO.Browser): Promise<void> {
    await browser.execute(() => {
        const htmlElement = document.querySelector('#fc-new_comment_field') as HTMLElement
        htmlElement.style.cssText = 'display:block !important; opacity: 1; position: inherit;'
    })
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
