import { LoginPage } from "../../login/page-object/Login.page"
import { auth } from "../../secrets/passwords"
import { IssuePage } from "../page-object/Issue.page"
import { IssuesPage } from "../page-object/Issues.page"
import { IssueModel, createIssuesModel } from "../model/issues.model"
import { getRandom } from "../../common/tools"
import { CloseIssuesPage } from "../page-object/closeIssues.pages"
import { FILE_NAME, EMPTY_STRING, VALID_FILE_PATH, INVALID_FILE_PATH } from "../data/issues.data" //константу положиь в дату


describe('Работа с задачей', () => {
    let loginPage: LoginPage
    let issuePage: IssuePage
    let issuesPage: IssuesPage
    let closeIssuePage: CloseIssuesPage

    let issue: IssueModel

    before('Before #1: Логинация', async () => { //логически разграничить before - можно создать много before
        loginPage = new LoginPage(browser)
        await loginPage.open()
        await loginPage.login(auth)
    })

    describe('Работа с задачей', () => {
        beforeEach(async () => {
            issuePage = new IssuePage(browser)
            issuesPage = new IssuesPage(browser)
            issue = createIssuesModel({ description: 'gfgfdgds', comment: 'tgrhghg' })
        })

        describe('Создание задачи и работа с задачей', () => {
            describe('Создание задачи', () => {
                it('#1 Создание задачи', async () => {
                    await issuePage.open()
                    await issuesPage.clickButtonNewIssue()
                    await issuesPage.setTitleNewIssue(issue)
                    await issuesPage.clickButtonSubmitNewIssue() //исправить название (не исп клик в названии)
                    issue.url = await browser.getUrl()
                    await issuePage.open()
                    expect(await issuesPage.isIssueExsist(issue)).toEqual(true)
                })
            })

            describe('Работа с задачей', () => {
                beforeEach(async () => {
                    await issuesPage.createIssue(issue)
                    issue.url = await browser.getUrl()
                })

                it('#2 Проверка, что созданная задача есть в списке задач', async () => {
                    await issuePage.open()
                    expect(await issuesPage.isIssueExsist(issue)).toEqual(true)
                })

                it('#3 Поиск задачи в списке через поиск', async () => {
                    await issuePage.open()
                    await issuesPage.setSearch(issue)
                    expect(await issuesPage.isIssueExsist(issue)).toEqual(true)
                })

                it('#4 Редактирование Title задачи', async () => {
                    let oldTitle: string = issue.title
                    issue.title = getRandom(256)

                    await issuePage.clickEditTitle() // не исп клик и запихнуть в один метод
                    await issuePage.setTitleIssue(issue)
                    await issuePage.updateTitle()

                    expect(await issuePage.getTitleIssueText()).not.toEqual(oldTitle) //нужно проверить что новы titile равен title из модели 
                })

                it('#5 Редактирование Description задачи', async () => {
                    let oldtDescription: string = await issuePage.getDescriptionText()
                    issue.description = getRandom(256)
                    await issuePage.clickKebabMenuDescription()
                    await issuePage.clickEditDescription()
                    await issuePage.setUpdatedDescription(issue)
                    await issuePage.saveUpdatedDescription()
                    expect(await issuePage.getFirstDescriptionText()).not.toEqual(oldtDescription)
                })


                it('#6 Добавление файла PNG в существующий комментарий', async () => {
                    await issuePage.clickKebabMenuDescription()
                    await issuePage.clickEditDescription()
                    await issuePage.uploadFile(VALID_FILE_PATH) //засунуть в data
                    await issuePage.saveUpdatedDescription()
                    expect(await issuePage.getAltImg()).toEqual(FILE_NAME)//засунуть в data
                })

                it('#7 Добавление файла невалидного формата *.robin-source в существующий комментарий', async () => {
                    await issuePage.clickKebabMenuDescription()
                    await issuePage.clickEditDescription()
                    await issuePage.uploadFile(INVALID_FILE_PATH)
                    expect(await issuePage.fileAtachErrorExist()).toEqual(true) //изменить на displayed
                })

                it('#8 Добавление комментария в задачу', async () => {
                    await issuePage.setTextComment(issue)
                    await issuePage.addComment()
                    expect(await issuePage.getLastCommentText()).toEqual(issue.comment)
                })

                it('#9 Заблокировать обсуждение задачи', async () => {
                    let lockText: string = await issuePage.getTextLockConversation()
                    await issuePage.lockConversation()
                    await issuePage.acceptLockConversation()
                    expect(await issuePage.getTextLockConversation()).not.toEqual(lockText)
                })

                it('#10 Закрытие задачи', async () => {
                    closeIssuePage = new CloseIssuesPage(browser)
                    await issuePage.closeIssue()
                    await closeIssuePage.open()
                    expect(await closeIssuePage.isIssueExsist(issue)).toEqual(true)
                })
            })

            afterEach(async () => {
                await issuePage.deleteIssue(issue)
            })
        })
    })

    describe('Удаление задачи', () => {
        before(async () => {
            await issuesPage.createIssue(issue)
            issue.url = await browser.getUrl()
        })

        it('#11 Удаление задачи', async () => {
            await issuePage.clickDeleteIssue()
            await issuePage.acceptDeleteIssue()
            await issuePage.open()
            expect(await issuesPage.isIssueExsist(issue)).toEqual(false)
        })
    })
})
