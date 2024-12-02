import { AxiosResponse } from "axios"
import { CreateTeamRequest } from "../TeamAPIDataProvider"
import { TeamAPIProvider } from "../TeamAPIProvider"
import { CreateTeamResponse } from "../TeamAPIService"

const ORGANIZATION_NAME = 'ines43487'

describe('Create team test', () => {
    it('team should be created, code is OK', async() => {
        const data: CreateTeamRequest = {
            name: 'Team name' + (new Date()).getTime()
        }

        const teamAPIProvider: TeamAPIProvider = new TeamAPIProvider({
            isSuccesfulResponse: false,
        })

        const response: AxiosResponse<CreateTeamResponse> = await teamAPIProvider.create(ORGANIZATION_NAME, data)

        expect(response.status).toEqual(201)
        expect(response.data.name).toEqual(data.name)
        expect(response.data.description).toBeNull()
        expect(response.data.created_at.match(/\d\d\d\d-\d\d-\d\dT\d\d\:\d\d:\d\dZ/)![0]).toBeDefined()
    })
})