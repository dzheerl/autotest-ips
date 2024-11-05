import { LoginPage } from "../../src/page-objects/Login.page"
import { auth } from "../../src/secrets/passwords"
import { IssueData, validIssueData } from "../data/issues.data"
import { IssuesPage } from "../page-object/Issues.page"
import { IssueModel, createIssuesModel } from "../model/model.issues"


describe('Issues Page', () => {
    let loginPage: LoginPage
    let issuePage: IssuesPage

    let issue: IssueModel

    before(async () => {
        loginPage = new LoginPage(browser)
        issuePage = new IssuesPage(browser)
        await loginPage.open()
        await loginPage.login(auth)
    })

    beforeEach(async () => {
        issue = createIssuesModel()
        await issuePage.open()
    })

    it('test it', async () => {
        issue.title = ''
        await issuePage.waitForDisplayedButtonNewIssue()
        await issuePage.clickButtonNewIssue()
        await issuePage.waitForDisplayedgetTitleForm()
        await issuePage.setTitle(issue.title)
        await issuePage.waitForDisplayedgetDescriptionForm()
        await issuePage.setDescription(issue.description)
        await issuePage.waitForDisplayedgetSubmitNewIssueButton()
        await issuePage.clickButtonSubmitNewIssue()
        await issuePage.waitForDisplayedgetTitleIssue(issue.title)
        let titleValue: string = await issuePage.getTitleIssueValue(issue.title)
        await issuePage.waitForDisplayedgetDescriptionIssue(issue.description)
        let descriptionValue: string = await issuePage.getDescriptionIssueValue(issue.description)
        expect(issue.title).toEqual(titleValue)
        expect(issue.description).toEqual(descriptionValue)
    })

    // afterEach(async () => {
    //     // runs after each test in this block
    // })

    // after(async () => {
    //     // runs once after the last test in this block
    // })
})
