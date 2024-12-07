import { LoginPage } from "../../login/page-object/Login.page"
import { auth } from "../../secrets/passwords"
import { IssuePage } from "../page-object/Issue.page"
import { IssuesPage } from "../page-object/Issues.page"
import { IssueModel, createIssuesModel } from "../model/issues.model"
import { Reporter } from "../../common/reporter/Reporter"


describe('Работа с задачей', () => {
    let loginPage: LoginPage
    let issuePage: IssuePage
    let issuesPage: IssuesPage

    let issue: IssueModel



    describe('Работа с задачей', () => {
        before('Before #1: Логинация', async () => { //логически разграничить before - можно создать много before
            loginPage = new LoginPage(browser)
            await loginPage.open()
            await loginPage.login(auth)
        })

        beforeEach(async () => {
            issuePage = new IssuePage(browser, 'https://github.com/TestUserIps7/qwert123/issues')
            issuesPage = new IssuesPage(browser)
            issue = createIssuesModel()
        })


        it('#1 Создание задачи', async () => {
            await issuesPage.createIssue(issue)
            issue.htmlUrl = await browser.getUrl()
            await issuesPage.open()
            Reporter.addStep('Проверить, что созданная задача есть в списке задач')
            expect(await issuesPage.isIssueExsist(issue)).toEqual(true)
        })


        afterEach(async () => {
            await issuePage.deleteIssue(issue)
        })
    })
})
