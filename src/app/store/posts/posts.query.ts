import { Injectable } from "@angular/core";
import { QueryEntity } from "@datorama/akita";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Post } from "./posts.model";
import { PostsState, PostsStore } from "./posts.store";

@Injectable({providedIn: 'root'})
export class PostsQuery extends QueryEntity<PostsState> {
    
    constructor(protected store: PostsStore) {
        super(store)
    }

    getPost(idPost: number): Observable<Post[]> {
        return this.selectAll().pipe(
            map((response: {[key: string]: any}) => {
                return Object
                  .keys(response)
                  .map(key => ({
                    ...response[key]
                  }))
                  .filter(p => p.id === idPost)
            })
        )
    }
}