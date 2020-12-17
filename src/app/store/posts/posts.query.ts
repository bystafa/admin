import { Injectable } from "@angular/core";
import { QueryEntity } from "@datorama/akita";
import { Observable } from "rxjs";
import { map, tap, filter } from "rxjs/operators";
import { Post } from "./posts.model";
import { PostsState, PostsStore } from "./posts.store";

@Injectable({providedIn: 'root'})
export class PostsQuery extends QueryEntity<PostsState> {
    
    //currentPost$: Observable<Post>

    constructor(protected store: PostsStore) {
        super(store)
    }

    getPost(idPost: number): Observable<Post[]> {
        //return this.select(idPost)
        return this.selectAll().pipe(
            //filter(v => v.forEach((elem: Post) => elem.id === idPost))
            // tap(v => v.forEach(elem => console.log(elem))),
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