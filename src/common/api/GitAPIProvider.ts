import { token } from "../../secrets/token"
import axios, { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse, Method } from 'axios'

class GitAPIProvider {
    protected headers: AxiosRequestHeaders
    protected personalToken = token

    constructor() { // разобраться для чего нужен конструктор
        this.headers = {
            'Accept': 'application/vnd.github+json',
            'Authorization': `Bearer ${this.personalToken}`,
            'X-GitHub-Api-Version': '2022-11-28',
        }
    }

    protected configureRequest(
        url: string,
        method: Method,
        data?: string | FormData
    ): AxiosRequestConfig {
        return {
            data,
            headers: this.headers,
            method,
            url: `https://api.github.com${url}`
        }
    }

    protected sendRequest<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> { //T - это дженерик , нужно почитать 
        return axios(config)
    }
}

export {
    GitAPIProvider
}