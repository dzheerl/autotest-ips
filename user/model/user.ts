type User = {
    name: string,
    company: string
}

function createUser(): User {
    return {
        name: 'Test Name',
        company: 'Test company'
    }
}

export {
    User, createUser
}