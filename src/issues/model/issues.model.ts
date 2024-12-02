import { getRandom } from "../../common/tools"
import { LabelModel } from "./label.model"

type IssueModel = {
    title: string,
    body?: string,
    comment?: string,
    labels?: LabelModel[],
    htmlUrl?: string,
    id?: number
}


function createIssuesModel(data?: Partial<IssueModel>): IssueModel {
    const issue: IssueModel = {
        title: data?.title ?? getRandom(255),
        body: data?.body,
        labels: data?.labels,
        comment: data?.comment,
        htmlUrl: data?.htmlUrl,
    }

    return issue
}

export {
    IssueModel,
    createIssuesModel
}

