import { User } from "../model/user"

type PatchUserRequest = {
    name: string,
    company: string,
}

class UserAPIDataProvider {
    public static getUserData(user: User): PatchUserRequest {
        return {
            name: user.name,
            company: user.company,
        }
    }
}

export {
    PatchUserRequest,
    UserAPIDataProvider,
}