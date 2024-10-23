function evenOdd() {
    const odd: number[] = []
    const even: number[] = []
    let value, end: number
    end = 100
    for (value = 0; value <= end; value++) {
        if (value % 2 === 0) {
            odd.push(value)
        } else {
            even.push(value)
        }
    }
    console.log(odd)
    console.log(even)
}

evenOdd()