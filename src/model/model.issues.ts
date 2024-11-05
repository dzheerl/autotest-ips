import { getRandom } from "../../src/common/tools"
import { IssueData } from "../data/issues.data"

type IssueModel = {
    title: string,
    description?: string
}

function createIssuesModel(data?: Partial<IssueModel>): IssueModel {
    return {
        title: data?.title ?? getRandom(10),
        description: data?.description
    }
}

export {
    IssueModel,
    createIssuesModel
}

