import { Injectable } from "@angular/core";
import { QueryEntity } from "@datorama/akita";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { CommentsState, CommentsStore } from "./comments.store";
import { Comment } from './comments.model'

@Injectable({providedIn: 'root'})
export class CommentsQuery extends QueryEntity<CommentsState> {
    
    constructor(protected store: CommentsStore) {
        super(store);
    }

    getComments(idPost: number): Observable<Comment[]> {
        // return this.selectAll().pipe(
        //     map((response: {[key: string]: any}) => {
        //         return Object
        //           .keys(response)
        //           .map(key => ({
        //             ...response[key]
        //           }))
        //           .filter(p => p.post.id === idPost)
        //     })
        // )
        return this.selectAll({
            filterBy: (entities) => entities.post.id === idPost
        })
    }

    getCommentsByName(user: string) {
        return this.selectAll({
            filterBy: (entities) => entities.author === user
        })
    }
}