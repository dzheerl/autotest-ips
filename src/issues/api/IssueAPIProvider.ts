import { AxiosRequestConfig, AxiosResponse } from "axios";
import { GitAPIProvider } from "../../common/api/GitAPIProvider";
import { IssueModel } from "../model/issues.model";

class IssueAPIProvider extends GitAPIProvider {
    public createIssue<T>(owner: string, repo: string, data: IssueModel): Promise<AxiosResponse<T>> {
        let body: string
        if (data.title != '') {
            body = JSON.stringify(data)
        } else {
            body = `{
                "title":"hello,
            }`
        }
        const config: AxiosRequestConfig = this.configureRequest(
            `/repos/${owner}/${repo}/issues`,
            'POST',
            body
        )
        return this.sendRequest(config)
    }

    public getIssues<T>(owner: string, repo: string): Promise<AxiosResponse<T>> {
        const config: AxiosRequestConfig = this.configureRequest(
            `/repos/${owner}/${repo}/issues`,
            'GET'
        )
        return this.sendRequest(config)
    }
}

export {
    IssueAPIProvider
}