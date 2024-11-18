import { ChainablePromiseElement } from 'webdriverio'
import { PageObject } from '../../page-objects/PageObjects'
import { Promouns, Email, EMPTY_STRING } from "../../common/type"
import { ProfilePage } from "../../profile/page-object/Profile.page"

class SettingsPage extends PageObject {
    protected url: string = 'https://github.com/settings/profile'

    constructor(browser: WebdriverIO.Browser) {
        super(browser)
    }

    public async setProfileName(profileName: string): Promise<void> {
        await this.getProfileNameForm().waitForDisplayed({
            timeoutMsg: 'Profile Name field was not displayed'
        })
        await this.getProfileNameForm().setValue(profileName)
    }

    public async setBioForm(Bio: string): Promise<void> {
        await this.getBioForm().waitForDisplayed({
            timeoutMsg: 'Bio field was not displayed'
        })
        await this.getBioForm().setValue(Bio)
    }

    public async getBioValue(): Promise<string> { //добавить проверку, что элемент доступен 
        await this.getBioForm().waitForDisplayed({
            timeoutMsg: 'Bio field was not displayed'
        })
        let bioValue: string = await this.getBioForm().getValue()
        return bioValue
    }

    public async getProfileNameValue(): Promise<string> {
        await this.getProfileNameForm().waitForDisplayed({
            timeoutMsg: 'Profile Name field was not displayed'
        })
        return await this.getProfileNameForm().getValue()

    }

    public async getSelectPublicEmailValue(): Promise<string> {
        await this.getPublicEmailSelect().waitForDisplayed({
            timeoutMsg: 'Select Email field was not displayed'
        })
        let selectPublicEmail: string = await this.getPublicEmailSelect().getValue()
        return selectPublicEmail
    }

    public async setPublicEmailSelect(indexElement: number): Promise<void> {
        await this.getPublicEmailSelect().waitForDisplayed({
            timeoutMsg: 'Select Email field was not displayed'
        })
        await this.getPublicEmailSelect().selectByIndex(indexElement)
    }

    public async setPronounsSelect(indexElement: number): Promise<void> {
        await this.getPronounsSelect().waitForDisplayed({
            timeoutMsg: 'Select Pronouns field was not displayed'
        })
        await this.getPronounsSelect().selectByIndex(indexElement)
    }


    public async getPronounsSelectValue(): Promise<string> {
        await this.getPronounsSelect().waitForDisplayed({
            timeoutMsg: 'Select Pronouns field was not displayed'
        })
        let selectPronouns: string = await this.getPronounsSelect().getValue()
        return selectPronouns
    }

    public async setPronounsCustomField(CustomValue: string): Promise<void> {
        await this.getPronounsCustomField().waitForDisplayed({
            timeoutMsg: 'Custom field was not displayed'
        })
        await this.getPronounsCustomField().setValue(CustomValue)
    }

    public async saveUpdateProfile(): Promise<void> {
        await this.getSubmitUpdateProfile().waitForClickable({ // проверку на кликабельность
            timeoutMsg: 'Submit field was not displayed'
        })
        await this.getSubmitUpdateProfile().click()
    }

    public async waitForDisplayedAlertSuccessfully(): Promise<void> {
        await this.getAlertSuccessfully().waitForDisplayed({
            timeoutMsg: 'Alert Successfully was not displayed',
        })
    }

    public async waitForDisplayedAlertFailed(): Promise<void> {
        await this.getAlertFailed().waitForDisplayed({
            timeoutMsg: 'Alert Failed was not displayed',
        })
    }

    public async getValueAlertFailed(): Promise<string> { // ожидание
        return await this.getAlertFailed().getText()
    }

    public async clickSubmitUploadImage(): Promise<void> {
        await (await this.getSubmitUploadImage()).waitForClickable({ //клабельность
            timeoutMsg: 'Submit field was not displayed' // исправить сообщение 
        })
        await this.getSubmitUploadImage().click()
    }

    public async waitForDisplayedAlertSuccesUpload(): Promise<void> {
        await this.getAlertSuccesUpload().waitForDisplayed({
            timeoutMsg: 'Alert Success Upload was not displayed',
        })
    }

    public async getTextAlertSuccesUpload(): Promise<string> { // ожидание 
        return await this.getAlertSuccesUpload().getText()
    }

    public async isDisplayedAlertFailedUpload(): Promise<void> {
        await this.getAlertFailedUpload().waitForDisplayed({
            timeoutMsg: 'Alert Failed Upload was not displayed',
        })
        await this.getAlertFailedUpload().isDisplayed()
    }

    public async uploadFile(filePath: string): Promise<void> {
        await this.getInputFile().waitForExist({
            timeoutMsg: 'File input field was not existed',
        })
        await showHiddenFileInput(this.browser)
        const file: string = await this.browser.uploadFile(filePath)
        await this.getInputFile().setValue(file)
    }

    public async getContextMenu(): Promise<void> {
        await await this.getContextMenuElement().waitForClickable({ // нужно ли проверять кликабельнось если это див с курсор=поинтер?
            timeoutMsg: 'Context menu was not clickable' // исправить сообщение 
        })
        await this.getContextMenuElement().click()
    }

    public async checkRemoveButtonExists(): Promise<void> {
        await this.getRemoveButton().isExisting()
    }

    public async removePhoto(): Promise<void> {
        await this.getContextMenu()
        if (await this.getUploadPhoto().isExisting()) {
            await (await this.browser.$('body')).click();
            return
        } else {
            await this.getRemoveButton().waitForClickable({ //клабельность
                timeoutMsg: 'Remove button was not clickable' // исправить сообщение 
            })
            await this.getRemoveButton().click()
            await this.browser.acceptAlert()
        }
    }

    public async resetSettignsPage(): Promise<void> {
        await this.open()

        await this.setProfileName(EMPTY_STRING)
        await this.setBioForm(EMPTY_STRING)
        await this.setPublicEmailSelect(Email.defaultValue)
        await this.setPronounsSelect(Promouns.defaultValue)

        await this.removePhoto()

        await this.saveUpdateProfile()
        await this.waitForDisplayedAlertSuccessfully()
    }

    public async setAndSaveProfileName(name: string): Promise<void> {
        await this.setProfileName(name)
        await this.saveUpdateProfile()
    }

    public async setAndSaveEmail(index: number): Promise<void> {
        await this.setPublicEmailSelect(index) // вынести в enum
        await this.saveUpdateProfile()
    }

    public async setAdnSavePromouns(index: number): Promise<void> {
        await this.setPronounsSelect(index) // сюда передавать enum
        await this.saveUpdateProfile()
    }

    private getInputFile(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('[type="file"]')
    }

    private getProfileNameForm(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@name="user[profile_name]"]')
    }

    private getBioForm(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="user_profile_bio"]')
    }

    private getPublicEmailSelect(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="user_profile_email"]')
    }

    private getPronounsSelect(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="user_profile_pronouns_select"]')
    }

    private getPronounsCustomField(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="user_profile_pronouns_select"]/following-sibling::input')
    }

    private getSubmitUpdateProfile(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@data-target="waiting-form.submit"]')
    }

    private getAlertSuccessfully(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//div[contains(text(), "Profile updated successfully")]')
    }

    private getAlertFailed(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//div[contains(text(), "Profile name is too long (maximum is 255 characters)")]')
    }

    private getAlertSuccesUpload(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//div[contains(text(), "Your profile picture has been updated.")]')
    }

    private getSubmitUploadImage(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@class="Box-footer"]')
    }

    private getAlertFailedUpload(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//div[contains(text(), "We only support PNG, GIF, or JPG pictures.")]')
    }

    private getContextMenuElement(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@class="avatar-upload"]/details/summary')
    }

    private getRemoveButton(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[contains(@class, "dropdown-menu")]/form/button')
    }

    private getUploadPhoto(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$("//*[@for='avatar_upload']")
    }
}

async function showHiddenFileInput(browser: WebdriverIO.Browser): Promise<void> {
    await browser.execute(() => {
        const htmlElement = document.querySelector('[type="file"]') as HTMLElement
        htmlElement.style.cssText = 'display:block !important; opacity: 1; position: inherit;'
    })
}

export {
    SettingsPage
}