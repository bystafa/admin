import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";
import { CommentsStore } from "./comments.store";
import { Comment } from './comments.model'

@Injectable({providedIn: 'root'})
export class CommentsService {
    constructor(private commentStore: CommentsStore, private http: HttpClient){}

    loadComments() {
        return this.http.get('http://localhost:1337/comments')
        .pipe(
            tap((entitier: Comment[]) => this.commentStore.set(entitier))
        )
    }

    // addComment(comment: Comment) {
    //     this.commentStore.add(comment)
    //     return this.http.post<Comment>('http://localhost:1337/COMMENTS', comment, {
    //         headers: new HttpHeaders({
    //             'Authorization': 'Bearer ' + localStorage.getItem('jwt')
    //         })
    //     })
    // }
    addComment(idPost: number, text: string) {
        let comment = {
            id: +new Date(),
            author: localStorage.getItem('user'),
            text,
            date: new Date,
            post: {
                id: idPost
            }
        }
        this.commentStore.add(comment)
        return this.http.post<Comment>('http://localhost:1337/COMMENTS', comment, {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            })
        })
    }


    changeComment(id: number, text: string) {
        this.commentStore.update(id, {text})
        return this.http.put<Comment>(`http://localhost:1337/COMMENTS/${id}`, 
        {
            text: text
        }, 
        {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            })
        })
    }

    deleteComment(id: number) {
        this.commentStore.remove(id)
        return this.http.delete<Comment>(`http://localhost:1337/COMMENTS/${id}`, {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            })
        })
    }

    clearStore() {
        this.commentStore.remove()
    }
}