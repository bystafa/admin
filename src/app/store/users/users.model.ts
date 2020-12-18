export interface Users {
    id: number
    username: string
    email: string
    img?: {
        url: string
    }
    firstName?: string
    lastName?: string
    birthday?: Date
    phone?: string
    city?: string
}

export function createUsers(params: Partial<Users>) {
    return {

    } as Users;
}
