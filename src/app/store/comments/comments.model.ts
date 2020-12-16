import { ID } from '@datorama/akita';

export interface Comment {
    id: ID;
    text: string;
    author: string;
    date: Date;
    post: {
        id: number;
    }
}

export function createProduct(params: Partial<Comment>) {
    return {

    } as Comment;
}
