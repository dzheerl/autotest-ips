import { IssueModel } from "../model/issues.model"
import { LabelModel } from "../model/label.model"

const OWNER: string = 'TestUserIps6'
const REPO: string = 'qwert123'

const REPO_WITHOUT_ISSUE: string = 'dontissue'

const REPO_INVALID: string = 'test123'


type issueRequest = {
    title: string,
    body?: string,
    labels?: LabelModel[]
}

class IssueAPIDataProvider {
    public static createIssueRequest(issue: IssueModel): issueRequest {
        return {
            title: issue.title,
            body: issue?.body,
            labels: issue?.labels
        }
    }
}


export {
    OWNER, REPO, REPO_WITHOUT_ISSUE, REPO_INVALID, issueRequest, IssueAPIDataProvider
}