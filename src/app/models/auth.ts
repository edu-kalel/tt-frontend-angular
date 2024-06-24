export interface authInfo {
    email: string
    password: string
}

export interface authToken {
    token: string,
    role: string,
    name: string,
    email: string
}