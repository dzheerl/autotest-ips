import { AxiosResponse } from "axios"
import { CreateTeamRequest } from "../TeamAPIDataProvider"
import { TeamAPIProvider } from "../TeamAPIProvider"

const ORGANIZATION_NAME = 'OrgTest123Qwerty123'

describe('create team test', () => {
    // before(async () => {
    //     // runs once before the first test in this block
    // })

    // beforeEach(async () => {
    //     // runs before each test in this block
    // })

    it('#1 Команда должна быть создана, код ответа 200', async () => {
        const data: CreateTeamRequest = {
            name: `Team name3`,
        }

        const provider: TeamAPIProvider = new TeamAPIProvider({
            isSuccesfulResponse: false
        })

        const response: AxiosResponse<CreateTeamRequest> = await provider.create(ORGANIZATION_NAME, data)

        // console.log(response.status, response.statusText, response.data)
        expect(response.status).toEqual(201)
        expect(response.data.name).toEqual(data.name)
        expect(response.data.description).toBeNull()

    })

    // afterEach(async () => {
    //     // runs after each test in this block
    // })

    // after(async () => {
    //     // runs once after the last test in this block
    // })
})
