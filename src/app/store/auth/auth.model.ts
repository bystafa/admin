export interface Auth {
    jwt: string;
    user: {
        id: number;
        username: string;
    }
    username?: string
}

export function createProduct(params: Partial<Auth>) {
    return {

    } as Auth;
}
