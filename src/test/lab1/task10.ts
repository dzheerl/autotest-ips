function startTime() {
    let seconds: number = 0
    const print = (): void => {
        console.log(seconds)
        seconds++
        setTimeout(print, 1000)
    }
    setTimeout(print, 1000)
}

startTime()