import { AxiosResponse } from "axios"
import { ArrayIssue, IssueModel } from "../model/issues.model"
import { IssueAPIProvider } from "./IssueAPIProvider"
import { IssueAPIDataProvider, OWNER, REPO, issueRequest } from "./IssueAPIDataProvider"

type createIssueResponse = { //типы прописными буквами
    number: number,
    html_url: string,
    id: number
}

type IssueListResponse = {
    id: number
    title: string,
    test: string
}

class IssueAPIService {
    public static async createIssue(owner: string, repo: string, issue: IssueModel): Promise<createIssueResponse> {
        const data: issueRequest = IssueAPIDataProvider.createIssueRequest(issue)
        const issueAPIProvider: IssueAPIProvider = new IssueAPIProvider()
        const response: AxiosResponse<createIssueResponse> = await issueAPIProvider.createIssue(owner, repo, data)
        return response.data
    }

    public static async getIssues(owner: string, repo: string): Promise<IssueListResponse[]> {
        const issueAPIProvider: IssueAPIProvider = new IssueAPIProvider()
        const getIssue: AxiosResponse<IssueListResponse[]> = await issueAPIProvider.getIssues(owner, repo)
        return getIssue.data
    }
}

export {
    IssueAPIService, createIssueResponse, IssueListResponse
}