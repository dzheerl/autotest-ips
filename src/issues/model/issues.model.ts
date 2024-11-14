import { getRandom } from "../../common/tools"

type IssueModel = {
    title: string,
    description?: string,
    comment?: string,
    url?: string,
}

function createIssuesModel(data?: Partial<IssueModel>): IssueModel {
    return {
        title: data?.title ?? getRandom(255),
        description: data?.description ?? getRandom(255),
        comment: data?.comment ?? getRandom(255)
    }
}

export {
    IssueModel,
    createIssuesModel
}

