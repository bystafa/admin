import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PostsStore } from "./posts.store";
import { tap } from 'rxjs/operators'
import { Observable } from "rxjs";
import { Post } from "./posts.model";


@Injectable({providedIn: 'root'})
export class PostsService {
    constructor(private postsStore: PostsStore, private http: HttpClient){}

    loadPosts() {
        return this.http.get('http://localhost:1337/posts')
        .pipe(
            tap((entitier: Post[]) => this.postsStore.set(entitier))
        )
    }

    clearStore() {
        this.postsStore.remove()
    }
}