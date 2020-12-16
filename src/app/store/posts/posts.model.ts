import { ID } from '@datorama/akita';

export interface Post {
    id: ID;
    title: string;
    text: string;
    author: string;
    date: Date;
    img?: {
        url: string;
    };
}

export function createPost(params: Partial<Post>) {
    return {
        
    } as Post;
}