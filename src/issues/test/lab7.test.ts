import { AxiosResponse } from "axios"
import { IssueModel, createIssuesModel } from "../model/issues.model"
import { IssueAPIProvider } from "../api/IssueAPIProvider"
import { OWNER, REPO } from "../api/LabelAPIDataProvider"
import { IssuesArray, REPO_INVALID, REPO_WITHOUT_ISSUE } from "../api/IssueAPIDataProvider"
import { getRandom } from "../../common/tools"

describe('API Test', () => {
    let issue: IssueModel

    // it('201 и проверка, что задача есть', async () => {
    //     issue = createIssuesModel()
    //     const issueAPIProvider: IssueAPIProvider = new IssueAPIProvider()
    //     const responseIssue: AxiosResponse<IssueModel> = await issueAPIProvider.createIssue(OWNER, REPO, issue)
    //     expect(responseIssue.status).toEqual(201)

    //     const getIssue: AxiosResponse<IssuesArray> = await issueAPIProvider.getIssues(OWNER, REPO)
    //     getIssue.data.forEach((issueCheck: IssueModel) => {
    //         if (issueCheck.id === responseIssue.data.id) {
    //             expect(responseIssue.data.id).toEqual(issueCheck.id)
    //             return
    //         }
    //     })
    // })

    // it('410 статус', async () => {
    //     issue = createIssuesModel()
    //     const issueAPIProvider: IssueAPIProvider = new IssueAPIProvider()
    //     const responseIssue: AxiosResponse<IssueModel> = await issueAPIProvider.createIssue(OWNER, REPO_WITHOUT_ISSUE, issue)
    //     expect(responseIssue.status).toEqual(410)
    // })

    it('400 статус', async () => {
        issue = createIssuesModel()
        // issue.body = 'hello'
        console.log(issue)
        const issueAPIProvider: IssueAPIProvider = new IssueAPIProvider()
        const responseIssue: AxiosResponse<IssueModel> = await issueAPIProvider.createIssue(OWNER, REPO, issue)
        expect(responseIssue.status).toEqual(400)
    })

    // it('422 статус', async () => {
    //     issue = createIssuesModel({ title: `${getRandom(1000)}` })
    //     const issueAPIProvider: IssueAPIProvider = new IssueAPIProvider()
    //     const responseIssue: AxiosResponse<IssueModel> = await issueAPIProvider.createIssue(OWNER, REPO, issue)
    //     expect(responseIssue.status).toEqual(422)
    // })
})