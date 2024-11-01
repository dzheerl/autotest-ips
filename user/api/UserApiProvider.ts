import { AxiosRequestConfig, AxiosResponse } from "axios";
import { GitAPIProvider } from "../../src/common/api/GitAPIProvider";
import { PatchUserRequest } from "./UserApiDataProvider";

class UserApiProvider extends GitAPIProvider {
    public getUser<T>(): Promise<AxiosResponse<T>> {
        const config: AxiosRequestConfig = this.configureRequest(
            '/user',
            'GET'
        )
        return this.sendRequest(config)
    }

    public patchUser<T>(data: PatchUserRequest): Promise<AxiosResponse<T>> {
        const config: AxiosRequestConfig = this.configureRequest(
            '/user',
            'PATCH',
            JSON.stringify(data)
        )
        return this.sendRequest(config)
    }
}

export {
    UserApiProvider
}