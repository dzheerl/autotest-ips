import { AxiosResponse } from "axios"
import { IssueModel } from "../model/issues.model"
import { IssueAPIProvider } from "./IssueAPIProvider"
import { IssueAPIDataProvider, issueRequest } from "./IssueAPIDataProvider"

type createIssueResponse = {
    number: number,
    html_url: string
}

class IssueAPIService {
    public static async createIssue(owner: string, repo: string, issue: IssueModel): Promise<createIssueResponse> {
        const data: issueRequest = IssueAPIDataProvider.createIssueRequest(issue)
        const issueAPIProvider: IssueAPIProvider = new IssueAPIProvider()
        const response: AxiosResponse<createIssueResponse> = await issueAPIProvider.createIssue(owner, repo, data)
        return response.data
    }
}

export {
    IssueAPIService, createIssueResponse
}