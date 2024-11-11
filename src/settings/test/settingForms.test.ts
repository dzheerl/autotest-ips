import { auth } from "../../secrets/passwords"
import { LoginPage } from "../../login/page-object/Login.page"
import { getRandom } from "../../common/tools"
import { SettingsPage } from "../page-object/Settings.page"
import { Promouns, Email, EMPTY_STRING } from "../../common/type"
import { ProfilePage } from "../../profile/page-object/Profile.page"

describe('Settings Page', () => {
    let loginPage: LoginPage
    let settingsPage: SettingsPage
    let profilePage: ProfilePage

    before(async () => {
        loginPage = new LoginPage(browser)
        settingsPage = new SettingsPage(browser)
        profilePage = new ProfilePage(browser)
        await loginPage.open()
        await loginPage.login(auth)
        await settingsPage.resetSettignsPage()
    })

    beforeEach(async () => {
        await settingsPage.open()
    })

    it('#1 Ввод значения в поле Name', async () => { //переход на main страницу
        let updatedName: string = getRandom(254)
        await settingsPage.setAndSaveProfileName(updatedName)
        await profilePage.open()
        expect(await profilePage.getProfileNameText()).toEqual(updatedName)
    })

    it('#2 Невозможность ввода значения более чем 255 символов в поле Name', async () => { //добавить говорящее название теста
        let oldName: string = await settingsPage.getProfileNameValue()
        await settingsPage.setAndSaveProfileName(getRandom(256))
        browser.refresh()
        expect(await settingsPage.getProfileNameValue()).toEqual(oldName)
    })

    it('#3 Проверка установки селекта Public Email', async () => {
        await settingsPage.setAndSaveEmail(Email.alternativeValue)
        let updateEmail: string = await settingsPage.getSelectPublicEmailValue()
        await profilePage.open()
        expect(updateEmail).toEqual(await profilePage.getProfileEmailText()) //поменять местами
    })

    it('#4 Проверка установки селекта Promouns', async () => {
        await settingsPage.setAdnSavePromouns(Promouns.theyThem)
        let updatePronouns: string = await settingsPage.getPronounsSelectValue()
        await profilePage.open()
        expect(updatePronouns).toEqual(await profilePage.getPonounsText())
    })

    it('#5 Успешная загрузка валидного расширения png', async () => { // "должно быть загружено png"
        const filePath = './src/common/files/img/Коллекция.png'
        await settingsPage.uploadFile(filePath);
        await settingsPage.clickSubmitUploadImage()
        await settingsPage.checkRemoveButtonExists()
    })

    it('#6 Невозможность загрузить невалидное расширение txt', async () => {
        const filePath = './src/common/files/img/invalidExtension.txt'
        await settingsPage.uploadFile(filePath);
        await settingsPage.isDisplayedAlertFailedUpload()// можно добавить проверку, что он есть на мониторее
    })
})