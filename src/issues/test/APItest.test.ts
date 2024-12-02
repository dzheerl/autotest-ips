import { AxiosResponse } from "axios"
import { LabelAPIServeice } from "../api/LabelAPIService";
import { LabelModel, createLabelModel } from "../model/label.model";
import { OWNER, REPO } from "../api/LabelAPIDataProvider";
import { IssueModel, createIssuesModel } from "../model/issues.model";
import { getRandom } from "../../common/tools";
import { IssueAPIService } from "../api/IssueAPIService";
import { IssuePage } from "../page-object/Issue.page";
import { LoginPage } from "../../login/page-object/Login.page";
import { auth } from "../../secrets/passwords"
import { IssuesPage } from "../page-object/Issues.page";


describe('Test with API', () => {
    let loginPage: LoginPage //
    let label: LabelModel
    let issuePage: IssuePage
    let issuesPage: IssuesPage
    let issue: IssueModel
    label = createLabelModel()

    before('Before: Логинация', async () => {
        loginPage = new LoginPage(browser)
        await loginPage.open()
        await loginPage.login(auth)
    })

    describe('Создание задачи без Label', () => {
        before(async () => {

            issuesPage = new IssuesPage(browser)
            await LabelAPIServeice.getLabel(OWNER, REPO, label)
            issue = createIssuesModel({ body: `${getRandom(256)}` })
            const responseIssue: AxiosResponse = await IssueAPIService.createIssue(OWNER, REPO, issue)

            issue.htmlUrl = responseIssue.data.html_url
            issuePage = new IssuePage(browser, issue.htmlUrl!)
        })

        it('Добавление label к issue.', async () => {
            await browser.url(issue.htmlUrl!)
            issuePage.callLabelMenu()
            issuePage.chooseLabel()
            await browser.pause(2000)
            issuesPage.open()
            expect(await issuesPage.getLabelValue(label.name)).toEqual(true)
        })
    })

    describe('Создание задачи с Label', () => {
        before(async () => {
            issuePage = new IssuePage(browser)
            issuesPage = new IssuesPage(browser)
            const responseLabel = await LabelAPIServeice.getLabel(OWNER, REPO, label)
            issue = createIssuesModel({ body: `${getRandom(256)}`, labels: [`${responseLabel.data.name}`] })
            const responseIssue: AxiosResponse = await IssueAPIService.createIssue(OWNER, REPO, issue)
            issue.htmlUrl = responseIssue.data.html_url
        })

        it('Удаление label из issue.', async () => {
            await browser.url(issue.htmlUrl!)
            issuePage.callLabelMenu()
            issuePage.chooseLabel()
            await browser.pause(2000)
            issuesPage.open()
            expect(await issuesPage.getLabelValue(label.name)).toEqual(false)
        })
    })

    afterEach('Удаление созданной задачи и Label', async () => {
        await issuePage.deleteIssue(issue)
        const response: AxiosResponse = await LabelAPIServeice.deleteLabel(OWNER, REPO, label)
    })
})