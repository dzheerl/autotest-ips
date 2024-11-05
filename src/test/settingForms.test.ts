import { auth } from "../../secrets/passwords"
import { LoginPage } from "../../page-objects/Login.page"
import { getRandom } from "../../common/tools";
import { Promouns, SettingsPage } from "../../page-objects/Settings.page";

describe('Settings Page', () => {
    let loginPage: LoginPage
    let settingsPage: SettingsPage

    before(async () => {
        loginPage = new LoginPage(browser)
        settingsPage = new SettingsPage(browser)
        await loginPage.open()
        await loginPage.login(auth)

        await settingsPage.open()
        await settingsPage.setProfileName(getRandom(-1)) // использовать пустую строку , положить в const
        await settingsPage.setBioForm(getRandom(-1))
        await settingsPage.clickSubmitUpdateProfile() // переименовать метод 
        // добавить сбро Pronouns and photo 
        // await browser.acceptAlert() // обернуть клик и асептить диалоговое окно браузера
        await settingsPage.waitForDisplayedAlertSuccessfully()
    })

    beforeEach(async () => {
        await settingsPage.open()
    })

    it('#1 set value valid Name and Bio field', async () => { //переход на main страницу
        let name: string = getRandom(254) //не указывать тип в названии имени
        await settingsPage.setProfileName(name)
        let bioString: string = getRandom(159)
        await settingsPage.setBioForm(bioString)
        await settingsPage.clickSubmitUpdateProfile()
        // await settingsPage.waitForDisplayedAlertSuccessfully() // провера алерда отдельный тест
        let updatedName: string = await settingsPage.getProfileNameValue()
        let updatedBio: string = await settingsPage.getBioValue()
        expect(updatedName).toEqual(name)
        expect(updatedBio).toEqual(bioString)
    })

    it('#2 Set value Name, that is longer than 255 characters', async () => { //добавить говорящее название теста
        let originalTextAlert = "Profile name is too long (maximum is 255 characters)"
        let nameString: string = getRandom(256)
        await settingsPage.setProfileName(nameString)
        await settingsPage.clickSubmitUpdateProfile()
        await settingsPage.waitForDisplayedAlertFailed() // ненужное ожидание 
        let textAlert: string = await settingsPage.getValueAlertFailed()
        expect(originalTextAlert).toEqual(textAlert)
    })

    it('#3 Set select Public Email', async () => {
        let defaultSelectPublicEmail: string = "" // добавить в enum 
        await settingsPage.setPublicEmailSelect(SettingsPage.selectEmail.selectEmail) // вынести в enum
        await settingsPage.clickSubmitUpdateProfile()
        await settingsPage.waitForDisplayedAlertSuccessfully() // ненужная проверка
        let updateEmail: string = await settingsPage.getSelectPublicEmailValue()
        expect(defaultSelectPublicEmail).not.toEqual(updateEmail) //поменять местами
    })

    it('#4 Set select Pronouns', async () => {
        let defaultSelectOption: string = ""
        await settingsPage.setPronounsSelect(Promouns.theyThem) // сюда передавать enum
        await settingsPage.clickSubmitUpdateProfile()
        await settingsPage.waitForDisplayedAlertSuccessfully()
        let updatePronouns: string = await settingsPage.getPronounsSelectValue()
        expect(defaultSelectOption).not.toEqual(updatePronouns)
    })

    it('#5 Upload valid extension', async () => { // "должно быть загружено png"
        let originalTextAlert: string = 'Your profile picture has been updated. It may take a few minutes to update across the site.'
        const filePath = './src/common/files/img/Коллекция.png'
        await settingsPage.uploadFile(filePath);
        await settingsPage.clickSubmitUploadImage()
        await settingsPage.waitForDisplayedAlertSuccesUpload()
        let text: string = await settingsPage.getTextAlertSuccesUpload()
        expect(originalTextAlert).toEqual(await settingsPage.getTextAlertSuccesUpload())
    })

    it('#6 Upload invalid extension', async () => {
        let originalTextAlert: string = 'We only support PNG, GIF, or JPG pictures.'
        const filePath = './src/common/files/img/invalidExtension.txt'
        await settingsPage.uploadFile(filePath);
        await settingsPage.waitForDisplayedAlertFailedUpload()
        expect(originalTextAlert).toEqual(await settingsPage.getTextAlertFailedUpload()) // можно добавить проверку, что он есть на мониторее
    })
})