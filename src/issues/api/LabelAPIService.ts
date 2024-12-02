//Сервис для подготовки (создаю label issue )

import { AxiosResponse } from "axios"
import { LabelApiProvider } from "./LabelAPIProviders"
import { LabelModel } from "../model/label.model"
import { LabelApiDataProvider, createLabelRequest } from "./labelAPIDataProvider"

type createLabelResponse = {
    name: string,
    description: string
}

type deleteLabelResponse = {
    status: number
}

class LabelAPIService {
    public static async createLabel(owner: string, repo: string, label: LabelModel): Promise<createLabelResponse> {
        const data: createLabelRequest = LabelApiDataProvider.createLabelData(label)
        const labelAPIProvider: LabelApiProvider = new LabelApiProvider()
        const response: AxiosResponse<createLabelResponse> = await labelAPIProvider.createLabel(owner, repo, data)
        return response.data
    }

    public static async deleteLabel(owner: string, repo: string, data: LabelModel): Promise<AxiosResponse<deleteLabelResponse>> {
        const labelApiProvider: LabelApiProvider = new LabelApiProvider()
        const response: AxiosResponse<deleteLabelResponse> = await labelApiProvider.deleteLabel(owner, repo, data)
        return response
    }
}

export {
    LabelAPIService,
    createLabelResponse,
    deleteLabelResponse
}