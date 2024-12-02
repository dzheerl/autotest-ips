import { AxiosResponse } from "axios"
import { UserApiProvider } from "./UserApiProvider"
import { PatchUserRequest, UserAPIDataProvider } from "./UserApiDataProvider"
import { User } from "../model/user"

type GetUserResponse = {
    name: string,
    company: string,
    email: string
}



class UserApiService {
    public static async getUser(): Promise<GetUserResponse> {
        const userApiProvider: UserApiProvider = new UserApiProvider()
        const response: AxiosResponse<GetUserResponse> = await userApiProvider.getUser()
        return response.data
    }

    public static async patchUser(user: User): Promise<GetUserResponse> {
        const data: PatchUserRequest = UserAPIDataProvider.getUserData(user)
        const userApiProvider: UserApiProvider = new UserApiProvider()
        const response: AxiosResponse<GetUserResponse> = await userApiProvider.getUser()
        return response.data
    }
}

export {
    UserApiService,
    GetUserResponse
}