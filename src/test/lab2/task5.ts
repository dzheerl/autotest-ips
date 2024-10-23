const promise: Promise<string> = new Promise(
    (resolve) => {
        setTimeout(() => {
            resolve('resolve')
        }, 5000)
    })

async function print() {
    promise
        .then((result: string) => {
            console.log(result)
        })
}

print()
