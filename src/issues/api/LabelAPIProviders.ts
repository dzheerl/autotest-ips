import { AxiosRequestConfig, AxiosResponse } from "axios";
import { GitAPIProvider } from "../../common/api/GitAPIProvider";
import { LabelModel } from "../model/label.model";

class LabelApiProvider extends GitAPIProvider {
    public createLabel<T>(owner: string, repo: string, data: LabelModel): Promise<AxiosResponse<T>> {
        const config: AxiosRequestConfig = this.configureRequest(
            `/repos/${owner}/${repo}/labels`,
            'POST',
            JSON.stringify(data)
        )
        return this.sendRequest(config)
    }

    public deleteLabel<T>(owner: string, repo: string, data: LabelModel): Promise<AxiosResponse<T>> {
        const config: AxiosRequestConfig = this.configureRequest(
            `/repos/${owner}/${repo}/labels/${encodeURIComponent(data.name)}`,
            'DELETE'
        )
        return this.sendRequest(config)
    }
}

export {
    LabelApiProvider
}