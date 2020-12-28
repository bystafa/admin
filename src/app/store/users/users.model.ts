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
    addr?: string
    acceptFriend: [{
        lastName?: string
        firstName?: string
        username: string
        img?: {
            url: string
        }
    }],
    addFriend: [{
        lastName?: string
        firstName?: string
        username: string
        img?: {
            url: string
        }
    }],
    friends: [{
        lastName?: string
        firstName?: string
        username: string
        img?: {
            url: string
        }
    }]
}

export function createUsers(params: Partial<Users>) {
    return {

    } as Users;
}
