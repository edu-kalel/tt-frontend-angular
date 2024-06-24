export interface User {
    email: string,
    clinic: string,
    first_name: string,
    last_name: string,
    date_of_birth: Date,
    phone: string,
    sex: string,
    role?: string | any,
    parent_email?: string
    ailments?: string[]
}

export interface UserBasicInfo {
    fullName: string,
    age: number
    weight: number
    height: number,
    email: string
}

export interface UserInfo {
    email: string
    first_name: string
    last_name: string
}