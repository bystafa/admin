import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PostsStore } from "./posts.store";
import { tap } from 'rxjs/operators'
import { Observable } from "rxjs";
import { Post } from "./posts.model";
import { BaseUrl } from "src/app/baseUrl";
import { environment } from "src/environments/environment";


@Injectable({providedIn: 'root'})
export class PostsService extends BaseUrl{
    constructor(private postsStore: PostsStore, private http: HttpClient){super()}

    loadPosts() {
        return this.http.get(environment.strpUrl + this.POSTS_URL)
        .pipe(
            tap((entitier: Post[]) => this.postsStore.set(entitier))
        )
    }

    clearStore() {
        this.postsStore.remove()
    }
}