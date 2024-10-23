type Student = {
    name: string,
    age: number
}

let groupStudent: Student[] = []
const student1: Student = { name: 'Петр', age: 19 }
const student2: Student = { name: 'Олег', age: 20 }
const student3: Student = { name: 'Олег', age: 20 }
const student4: Student = { name: 'Олег', age: 19 }
groupStudent.push(student1)
groupStudent.push(student2)
groupStudent.push(student3)
groupStudent.push(student4)

groupStudent.forEach((person: Student) => console.log(person.name + ',', person.age, 'лет'))