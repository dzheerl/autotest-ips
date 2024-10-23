const promise: Promise<string> = new Promise(
    (resolve, reject) => {
        setTimeout(() => {
            resolve('resolve')
        }, 5000)
        setTimeout(() => {
            reject('reject')
        }, 100)
    })

promise
    .then((result: string) => {
        console.log(result)
    })
    .catch((result: string) => {
        console.log(result)
    })
