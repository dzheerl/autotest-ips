import dotenv from 'dotenv'

dotenv.config()

const MODULES: string[] = getModulesArray(process.env.MODULES as string)

function getModulesArray(modules?: string): string[] {
    if (!modules || modules == '') {
        return []
    }
    return modules.split(',')  //это символ разделения
}

export {
    MODULES,
}