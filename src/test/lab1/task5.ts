//Задание 5 сложение, вычитание, умножение, деление 

const addition = (a: number, b: number): void => {
    console.log(a + b)
}

const subtraction = (a: number, b: number): void => {
    console.log(a - b)
}

const multiplication = (a: number, b: number): void => {
    console.log(a * b)
}

const div = (a: number, b: number): void => {
    console.log(a / b)
}

function calc(callback: (a: number, b: number) => void, a: number, b: number) {
    callback(a, b)
}

calc(addition, 4, 5)
calc(subtraction, 4, 5)
calc(multiplication, 10, 5)
calc(div, 10, 5)
