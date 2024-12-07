type IssueData = {
    title: string,
    description: string
}

const ARRAY_ATTACH = [
    './src/data/1.jpg',
    './src/data/2.jpg',
    './src/data/3.jpg'
]

const EMPTY_STRING: string = ''

const VALID_FILE_PATH: string = './src/common/files/img/Коллекция.png'

const FILE_NAME: string = 'Коллекция'

const INVALID_FILE_PATH: string = './src/common/files/img/PDF.robin-source'

export {
    IssueData,
    EMPTY_STRING,
    VALID_FILE_PATH,
    FILE_NAME,
    INVALID_FILE_PATH,
    ARRAY_ATTACH
}