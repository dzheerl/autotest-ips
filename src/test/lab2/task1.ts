type cats = {
    name: string,
    age: number,
    breed: string,
    color: string
}

const cat1: cats = { name: 'Леопольд', age: 4, breed: 'Сибирский', color: 'Рыжий' }

console.log('Name: ', cat1.name, ' | Возраст: ', cat1.age, ' | Порода: ', cat1.breed, " | Цвет: ", cat1.color)