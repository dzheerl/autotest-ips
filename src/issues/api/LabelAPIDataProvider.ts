import { LabelModel } from "../model/label.model";

type createLabelRequest = {
    name: string,
    description?: string
}

class LabelApiDataProvider {
    public static createLabelData(label: LabelModel): createLabelRequest {
        return {
            name: label.name,
            description: label?.description
        }
    }
}


export {
    createLabelRequest,
    LabelApiDataProvider
}