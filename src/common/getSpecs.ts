import { MODULES } from "../env"

function getSpecs(): string[] {
    const specs: string[] = []

    for (const module of MODULES) {
        specs.push(`./src/**/${module}/**/*.test.ts`)
    }

    return specs
}

export {
    getSpecs,
}