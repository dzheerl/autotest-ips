const promise: Promise<string> = new Promise(
    (resolve) => {
        setTimeout(() => {
            resolve('resolve')
        }, 1000)
    })

promise
    .then((result: string) => {
        console.log(result)
    })
