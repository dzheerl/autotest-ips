//Задание 4

function checkAge(age: number): void {
  if (age >= 18) {
    console.log('Страница доступна')
  } else {
    console.log('Страница недоступна')
  }
}

let age: number = 0
checkAge(age)