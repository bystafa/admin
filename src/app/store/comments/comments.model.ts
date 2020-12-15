import { ID } from '@datorama/akita';

export interface Comment {
    id: ID;
    title: string;
    text: string;
    author: string;
    date: Date;
    post: Object;
}

export function createProduct(params: Partial<Comment>) {
    return {

    } as Comment;
}
