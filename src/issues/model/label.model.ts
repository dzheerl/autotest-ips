import { getRandom } from "../../common/tools"

type LabelModel = {
    name: string,
    description?: string
}

function createLabelModel(data?: Partial<LabelModel>): LabelModel {
    const label: LabelModel = {
        name: data?.name ?? getRandom(10),
        description: data?.description
    }
    return label
}

export {
    LabelModel, createLabelModel
}