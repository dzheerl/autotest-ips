import { AxiosRequestConfig, AxiosResponse } from "axios"
import { ArrayIssue, IssueModel, createIssuesModel } from "../model/issues.model"
import { IssueAPIProvider } from "../api/IssueAPIProvider"

import { OWNER, REPO, REPO_INVALID, REPO_WITHOUT_ISSUE } from "../api/IssueAPIDataProvider"
import { getRandom } from "../../common/tools"
import { IssueAPIService, IssueListResponse, createIssueResponse } from "../api/IssueAPIService"
import { token } from "../../secrets/token"

describe('API Test', () => {
    let issue: IssueModel
    const issueAPIProvider: IssueAPIProvider = new IssueAPIProvider()

    beforeEach('Создаем модель', () => {
        issue = createIssuesModel()
    })

    it('Отправка POST запроса создания задачи, и проверка статуса 201 и что задача есть', async () => {
        const responseIssue: AxiosResponse<createIssueResponse> = await issueAPIProvider.createIssue(OWNER, REPO, issue)
        expect(responseIssue.status).toEqual(201)
        const responseGetIssue: IssueListResponse[] = await IssueAPIService.getIssues(OWNER, REPO)
        checkIssue(responseGetIssue, responseIssue.data.id)
    })

    // it('Отправка POST запроса на создание задача в репозиторий, где нельзя создавать задачи и проверка 410 статуса', async () => {
    //     const responseIssue: AxiosResponse<createIssueResponse> = await issueAPIProvider.createIssue(OWNER, REPO_WITHOUT_ISSUE, issue)
    //     expect(responseIssue.status).toEqual(410)
    // })

    // it('Отправка POST запроса с невалидным body и проверка 400 статуса', async () => {
    //     const conf: AxiosRequestConfig = {
    //         data: `{"title:: "title}`,
    //         headers: {
    //             'Accept': 'application/vnd.github+json',
    //             'Authorization': `Bearer ${token}`,
    //             'X-GitHub-Api-Version': '2022-11-28',
    //         },
    //         method: 'POST',
    //         url: `https://api.github.com/repos/${OWNER}/${REPO}/issues`
    //     }
    //     const responseIssue: AxiosResponse<createIssueResponse> = await issueAPIProvider.sendRequest(conf)
    //     console.log(responseIssue.status)
    //     expect(responseIssue.status).toEqual(400)
    // })

    // it('Отправка POST запроса с невалидным значением ключа(первышение длины значения title) и проверка 422 статуса', async () => {
    //     issue.title = getRandom(1000)
    //     const responseIssue: AxiosResponse<IssueModel> = await issueAPIProvider.createIssue(OWNER, REPO, issue)
    //     expect(responseIssue.status).toEqual(422)
    // })
})

// function checkIssue(issueArray: IssueListResponse, id: number): boolean {
//     let isExsist: boolean = false
//     issueArray.forEach((issueCheck: IssueModel) => {
//         if (issueCheck.id === id) {
//             expect(id).toEqual(issueCheck.id)
//             return isExsist = true
//         }
//     })
//     return isExsist
// }

function checkIssue(issueArray: IssueListResponse[], id: number) {
    const found: IssueListResponse | undefined = issueArray.find((issueCheck: IssueModel) => issueCheck.id === id)
    expect(found).toBeDefined()
}


