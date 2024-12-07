describe('test describe', () => {
    let checkString: string

    // before(async () => {

    // })

    beforeEach(async () => {
        checkString = 'hello'
    })

    describe('test descibe include', () => {
        it('test it', async () => {
            checkString = checkString + ' world'
            console.log(checkString)
        })
    })

    describe('test descibe include2', () => {
        it('test it', async () => {
            checkString = checkString + ' world2'
            console.log(checkString)
        })
    })

    afterEach(async () => {
        console.log(checkString)
    })

    after(async () => {
        // runs once after the last test in this block
    })
})
