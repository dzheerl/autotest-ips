import { Result } from "wdio-image-comparison-service"

describe('test describe', () => {
    let checkString: string

    // before(async () => {

    // })
    // let i: number = 0
    // beforeEach(async () => {
    //     console.log('beforeEach')
    // })

    it('test it', async () => {
        await browser.url('google.com')
        await browser.pause(3000)
        const result: Result = await browser.checkFullPageScreen('Name')
        expect(result).toEqual(0)
    })




    // afterEach(async () => {
    //     console.log('afterEach')
    // })

    // after(async () => {
    //     // runs once after the last test in this block
    // })
})
