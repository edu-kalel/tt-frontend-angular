export interface User {
    email: string,
    clinic: string,
    first_name: string,
    last_name: string,
    date_of_birth: Date,
    phone: string,
    sex: string,
    role: string,
    parent_email?: string
    ailments?: string[]
}