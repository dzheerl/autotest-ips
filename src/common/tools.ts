import { ChainablePromiseElement } from 'webdriverio'

async function skipPopups(browser: WebdriverIO.Browser, userID: string): Promise<void> {
    await browser.execute(ID => {
        localStorage.setItem(`ispring::learn::coursesPage::welcomePopup::${ID}`, '1')
    }, userID)
}

function getRandom(lengthStr: number): string {
    const alphabetArray: string[] = [
        // Кириллица (заглавные)
        'А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О',
        'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э',
        'Ю', 'Я',

        // Кириллица (строчные)
        'а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н',
        'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ы',
        'ь', 'э', 'ю', 'я',

        // Латиница (заглавные)
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
        'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',

        // Латиница (строчные)
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
        'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u',
        'v', 'w', 'x', 'y', 'z',

        // Знаки
        '_',
        '-'
    ]
    const min: number = 0
    const max = alphabetArray.length - 1
    let symbolNumber, count: number = 0
    let str: string = ""
    for (count; count <= lengthStr - 1; count++) {
        symbolNumber = Math.floor(Math.random() * (max - min + 1)) + min
        str = str + alphabetArray[symbolNumber]
    }
    return str
}


class UploadFile {
    private browser: WebdriverIO.Browser

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser
    }

    public async uploadFile(filePath: string): Promise<void> {
        await this.getInputFile().waitForExist({
            timeoutMsg: 'File input field was not existed',
        })
        await showHiddenFileInput(this.browser)
        const file: string = await this.browser.uploadFile(filePath)
        await this.getInputFile().setValue(file)
    }

    private getInputFile(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('[type="file"]')
    }
}

async function showHiddenFileInput(browser: WebdriverIO.Browser): Promise<void> {
    await browser.execute(() => {
        const htmlElement = document.querySelector('[type="file"]') as HTMLElement
        htmlElement.style.cssText = 'display:block !important; opacity: 1; position: inherit;'
    })
}

console.log(getRandom(512))

export {
    skipPopups, getRandom, UploadFile, showHiddenFileInput
}