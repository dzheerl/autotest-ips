import { LoginPage } from "../../login/page-object/Login.page"
import { auth } from "../../secrets/passwords"
import { IssueData } from "../data/issues.data"
import { IssuesPage } from "../page-object/Issues.page"
import { IssueModel, createIssuesModel } from "../model/issues.model"


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
    })

    beforeEach(async () => {
        issue = createIssuesModel()
    })

    it('#1 Создание задачи c Title и Descriptiopn', async () => {
        await issuePage.clickButtonNewIssue // create new issue (создать, указать title и desc)
        let issueTitle: string = issue.title
        issue.url = await

            await issuePage.setTitle(issueTitle)
        let issueDescription: string = issue.description
        await issuePage.setDescription(issueDescription)
        await issuePage.clickButtonSubmitNewIssue()
        expect(await issuePage.getTitleIssueText()).toEqual(issueTitle)
    })

    it('#2 Редактирование Title задачи', async () => {
        await issuePage.clickButtonNewIssue()
        let issueTitle: string = issue.title
        await issuePage.setTitle(issueTitle)
        let issueDescription: string = issue.description
        await issuePage.setDescription(issueDescription)
        await issuePage.clickButtonSubmitNewIssue()
        expect(await issuePage.getTitleIssueText()).toEqual(issueTitle)
    })



    // afterEach(async () => {
    //     // runs after each test in this block
    // })

    // after(async () => {
    //     // runs once after the last test in this block
    // })
})
