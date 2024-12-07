import { Result } from "wdio-image-comparison-service"
import { IssuePage } from "../page-object/Issue.page"
import { LoginPage } from "../../login/page-object/Login.page"
import { auth } from "../../secrets/passwords"
import { createIssueResponse, IssueAPIService } from "../api/IssueAPIService"
import { IssueModel, createIssuesModel } from "../model/issues.model"
import { OWNER, REPO } from "../api/IssueAPIDataProvider"
import { FILE_NAME, EMPTY_STRING, VALID_FILE_PATH, INVALID_FILE_PATH, ARRAY_ATTACH } from "../data/issues.data"

describe('Скриншотные тесты', () => {
    let issue: IssueModel
    let issuePage: IssuePage

    before('Before: Логинация', async () => {
        let loginPage: LoginPage
        loginPage = new LoginPage(browser)
        await loginPage.open()
        await loginPage.login(auth)
    })

    beforeEach('Создание задачи', async () => {
        issue = createIssuesModel({ title: 'Скриншоты' })
        const response: createIssueResponse = await IssueAPIService.createIssue(OWNER, REPO, issue)
        issue.htmlUrl = response.html_url
    })

    ARRAY_ATTACH.forEach((filePath, index) => {
        it('Добавление изображение в комментария в задачу', async () => {
            issuePage = new IssuePage(browser, issue.htmlUrl!)
            issuePage.open()
            await issuePage.uploadFileComment(filePath)
            await issuePage.addComment()
            await issuePage.waitImg()
            const result: Result = await browser.checkFullPageScreen(`ussuescreenshot-${index + 1}`)
            expect(result).toBeLessThanOrEqual(0.6)
        })
    })


    afterEach(async () => {
        await issuePage.deleteIssue(issue)
    })
})