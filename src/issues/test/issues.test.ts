import { LoginPage } from "../../login/page-object/Login.page"
import { auth } from "../../secrets/passwords"
import { IssueData } from "../data/issues.data"
import { IssuesPage } from "../page-object/Issues.page"
import { IssueModel, createIssuesModel } from "../model/issues.model"
import { PageObject } from "../../page-objects/PageObjects"
import { getRandom } from "../../common/tools"


describe('Issues Page', () => {
    let loginPage: LoginPage
    let issuePage: IssuesPage

    let issue: IssueModel

    before(async () => {
        loginPage = new LoginPage(browser)
        issuePage = new IssuesPage(browser)
        await loginPage.open()
        await loginPage.login(auth)
        await issuePage.open()
        issue = createIssuesModel()
    })

    beforeEach(async () => {

    })

    it('#1 Создание задачи c Title и Description', async () => {
        await issuePage.clickButtonNewIssue() // create new issue (создать, указать title и desc)
        let issueTitle: string = issue.title
        await issuePage.setTitleNewIssue(issue)
        await issuePage.setDescriptionNewIssueForm(issue)
        await issuePage.clickButtonSubmitNewIssue()
        issue.url = await browser.getUrl()
        // expect(await issuePage.getTitleIssueText()).toEqual(issue.title)
        // expect(await issuePage.getFirstDescriptionText()).toEqual(issue.description)
        expect([await issuePage.getTitleIssueText(), await issuePage.getFirstDescriptionText()]).toEqual([issue.title, issue.description])
    })

    it('#2 Редактирование Title задачи', async () => {
        await browser.url(issue.url)
        let oldTitle: string = await issuePage.getTitleIssueText()
        issue.title = getRandom(256)
        await issuePage.clickEditTitle()
        await issuePage.setTitleIssue(issue)
        await issuePage.updateTitle()
        expect(await issuePage.getTitleIssueText()).not.toEqual(oldTitle)
    })

    it('#3 Редактирование Description задачи', async () => {
        await browser.url(issue.url)
        let oldtDescription: string = await issuePage.getDescriptionText()
        issue.description = getRandom(256)
        await issuePage.clickKebabMenuDescription()
        await issuePage.clickEditDescription()
        await issuePage.setUpdatedDescription(issue)
        await issuePage.saveUpdatedDescription()
        expect(await issuePage.getFirstDescriptionText).not.toEqual(oldtDescription)
    })


    it('#4 Добавление файла PNG в существующий комментарий', async () => {
        await browser.url(issue.url)
        await browser.refresh()
        await issuePage.clickKebabMenuDescription()
        await issuePage.clickEditDescription()
        await issuePage.uploadFile('./src/common/files/img/Коллекция.png') //Загнать в константу
        await browser.pause(3000)
        await issuePage.saveUpdatedDescription()
        expect(await issuePage.getAltImg()).toEqual("Коллекция") // загнать в константу
    })

    it('#5 Добавление файла невалидного формата в существующий комментарий', async () => {
        await browser.url(issue.url)
        await browser.refresh()
        await issuePage.clickKebabMenuDescription()
        await issuePage.clickEditDescription()
        await issuePage.uploadFile('./src/common/files/img/PDF.robin-source') //Загнать в константу
        expect(await issuePage.fileAtachErrorExist()).toEqual(true) // загнать в константу
        await browser.pause(3000)
    })



    // afterEach(async () => {
    //     // runs after each test in this block
    // })

    // after(async () => {
    //     // runs once after the last test in this block
    // })
})
