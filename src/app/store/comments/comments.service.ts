import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";
import { CommentsStore } from "./comments.store";
import { Comment } from './comments.model'
import { BaseUrl } from "src/app/baseUrl";
import { environment } from "src/environments/environment";

@Injectable({providedIn: 'root'})
export class CommentsService extends BaseUrl {

    comment: Comment
    authKey = localStorage.getItem('jwt')
    
    constructor(private commentStore: CommentsStore, private http: HttpClient){super()}

    loadComments() {
        return this.http.get(environment.strpUrl + this.COMMENTS_URL)
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
        this.comment = {
            id: +new Date(),
            author: localStorage.getItem('user'),
            text,
            date: new Date,
            post: {
                id: idPost
            }
        }
        //this.commentStore.add(this.comment)
        return this.http.post<Comment>(environment.strpUrl + this.COMMENTS_URL, this.comment, {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + this.authKey
            })
        })

    }


    changeComment(id: number, text: string) {
        //this.commentStore.update(index, {text})
        return this.http.put<Comment>(`${environment.strpUrl}${this.COMMENTS_URL}/${id}`, 
        {
            text: text
        }, 
        {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + this.authKey
            })
        })
    }

    deleteComment(id: number) {
        //this.commentStore.remove(id)
        return this.http.delete<Comment>(`${environment.strpUrl}${this.COMMENTS_URL}/${id}`, {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + this.authKey
            })
        })
    }

    setDataIfSuccess(func: string, id?: number, text?: string){
        switch (func) {
            case 'delete': {
                this.commentStore.remove(id)
                break;
            }
            case 'change': {
                this.commentStore.update(id, {text})
                break;
            }
            case 'add': {
                this.commentStore.add(this.comment)
                this.comment = null
                break;
            }
        }
    }

    clearStore() {
        this.commentStore.remove()
    }
}