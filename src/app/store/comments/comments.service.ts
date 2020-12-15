import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";
import { CommentsStore } from "./comments.store";

@Injectable({providedIn: 'root'})
export class CommentsService {
    constructor(private commentStore: CommentsStore, private http: HttpClient){}

    loadComments() {
        return this.http.get('http://localhost:1337/posts')
        .pipe(
            tap((entitier: Comment[]) => this.commentStore.set(entitier))
        )
    }

    clearStore() {
        this.commentStore.remove()
    }
}