import { GetUserResponse, UserApiService } from "./api/UserApiServeice"
import { createUser, User } from "./model/user"

describe('Test API', () => {
    it('', async () => {
        const response: GetUserResponse = await UserApiService.getUser()
        console.log(response.data)
        const user: User = createUser()
        const patchResponse: GetUserResponse = await UserApiService.patchUser(user)
        console.log(patchResponse)
    })
})

