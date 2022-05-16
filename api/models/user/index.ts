export interface Name {
    firstName: string
    infix?: string
    lastName: string
}

export interface User {
    name: Name
    birthdate: Date
}
