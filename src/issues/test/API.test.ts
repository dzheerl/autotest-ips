import { AxiosResponse } from "axios"
import { createIssueResponse, IssueAPIService } from "../api/IssueAPIService"
import { IssueModel, createIssuesModel } from "../model/issues.model"

import { IssueAPIProvider } from "../api/IssueAPIProvider"
import { createLabelModel, LabelModel } from "../model/label.model"
import { OWNER, REPO } from "../api/IssueAPIDataProvider"
import { createLabelResponse, deleteLabelResponse, LabelAPIService } from "../api/LabelAPIService"
import { IssuePage } from "../page-object/Issue.page"
import { IssuesPage } from "../page-object/Issues.page"
import { LoginPage } from "../../login/page-object/Login.page"
import { auth } from "../../secrets/passwords"

describe('API test', () => {
    before('Before: Логинация', async () => {
        let loginPage: LoginPage
        loginPage = new LoginPage(browser)
        await loginPage.open()
        await loginPage.login(auth)
    })

    let label: LabelModel
    let issue: IssueModel
    let issuePage: IssuePage

    describe('Добавление label к issue', async () => {
        before('Создание Issue без задачи', async () => {
            issue = createIssuesModel()
            const response: createIssueResponse = await IssueAPIService.createIssue(OWNER, REPO, issue)
            issue.htmlUrl = response.html_url
        })

        before('Создание label', async () => {
            label = createLabelModel()
            const response: createLabelResponse = await LabelAPIService.createLabel(OWNER, REPO, label)
        })

        it('Добавление label к issue.', async () => {
            issuePage = new IssuePage(browser, issue.htmlUrl!)
            issuePage.open()
            await issuePage.callLabelMenu()
            await issuePage.chooseLabel(label.name)

            let issuesPage: IssuesPage
            issuesPage = new IssuesPage(browser)
            issuesPage.open()
            expect(await issuesPage.getLabelValue(label.name)).toEqual(true)
        })

        afterEach(async () => {
            await LabelAPIService.deleteLabel(OWNER, REPO, label)
            await issuePage.deleteIssue(issue)
        })
    })

    describe('Удаление label из issue', async () => {
        before('Создание Issue с label', async () => {
            label = createLabelModel()
            issue = createIssuesModel({ labels: [label] })
            const response: createIssueResponse = await IssueAPIService.createIssue(OWNER, REPO, issue)
            issue.htmlUrl = response.html_url
        })

        it('Удаление label к issue.', async () => {
            issuePage = new IssuePage(browser, issue.htmlUrl!)
            issuePage.open()
            await issuePage.callLabelMenu()
            await issuePage.chooseLabel(label.name)

            let issuesPage: IssuesPage
            issuesPage = new IssuesPage(browser)
            issuesPage.open()
            expect(await issuesPage.getLabelValue(label.name)).toEqual(false)
        })

        afterEach(async () => {
            await LabelAPIService.deleteLabel(OWNER, REPO, label)
            await issuePage.deleteIssue(issue)
        })
    })






    // afterEach(async () => {
    //     // runs after each test in this block
    // })


})
