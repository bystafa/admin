import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Login } from "src/app/pages/auth-page/auth-page.component";
import { UsersStore } from "./users.store";
import { tap } from 'rxjs/operators'
import { Auth } from "../auth";
import { Users } from "./users.model";
import { SetEntities } from "@datorama/akita/lib/setEntities";
import { environment } from "src/environments/environment";
import { BaseUrl } from "src/app/baseUrl";

@Injectable({providedIn: 'root'})
export class UsersService extends BaseUrl{

    constructor(private usersStore: UsersStore, private http: HttpClient){
        super()
    }

    keySuperAdmin = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjA4MjM3NDc1LCJleHAiOjE2MTA4Mjk0NzV9.ne1ZyUMTnqyD2kgFaviMBWSz_vp_ORW2MvGYuZ5JElU'
    keyAuth = localStorage.getItem('jwt')

    getUsers() {
        return this.http.get(environment.strpUrl + this.USERS_URL, {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + this.keySuperAdmin
            })
        })
        .pipe(
            tap((entities: Users[])=> {
                entities.forEach((elem) => {
                    this.usersStore.add(entities)
                    if (!elem.img) {
                        this.usersStore.update(elem.id, {
                            img: {
                                url: this.DEFAULTPHOTO
                            }
                        })
                    }
                })
                console.log(this.usersStore.getValue())
                // console.log(entities)
                // this.usersStore.set(entities)
            })
        )
    }

    createUser(info: Users) {
        return this.http.post(environment.strpUrl + this.USERS_URL, info,{
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + this.keySuperAdmin
            })
        })
    }

    uploadPhoto(data: FormData) {
        return this.http.post(environment.strpUrl + this.UPLOAD_URL, data, {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + this.keyAuth
            })
        })
    }

    changeDataUser(id: number, data: Users) {
        return this.http.put(`${environment.strpUrl}${this.USERS_URL}/${id}`, 
        data, 
        {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + this.keyAuth
            })
        })
    }

    setDataIfSuccess(id: number, data, type?: string, idSecondUser?: number, firstParam?, secondParam?, thirdParam?, fourthParam?) {
        if (type) {
            switch (type) {
                case 'remove': {
                    this.usersStore.update(id,{
                        friends: data
                    })
                    this.usersStore.update(idSecondUser, {
                        friends: firstParam
                    })
                    break
                }

                case 'add': {
                    this.usersStore.update(id,{
                        friends: data,
                        acceptFriend: firstParam
                    })
                    this.usersStore.update(idSecondUser, {
                        friends: secondParam,
                        addFriend: thirdParam
                    })
                    break
                }

                case 'removeAdd': {
                    this.usersStore.update(id, {
                        addFriend: data
                    })
                    this.usersStore.update(idSecondUser, {
                        acceptFriend: firstParam
                    })
                    break
                }
                case 'removeAccept': {
                    this.usersStore.update(id, {
                        acceptFriend: data
                    })
                    this.usersStore.update(idSecondUser, {
                        addFriend: firstParam
                    })
                    break
                }

                case 'addFriend': {
                    this.usersStore.update(id, {
                        acceptFriend: data
                    })
                    this.usersStore.update(idSecondUser, {
                        addFriend: firstParam
                    })
                    break
                }
                default: break
            }
        } else  this.usersStore.update(id, data)
    }
    
    addDataIfSuccess(data) {
        this.usersStore.add(data)
    }

    addOrRemoveFriend(id:number, users, acceptusers?) {
        return this.http.put(`${environment.strpUrl}${this.USERS_URL}/${id}`,
        {
            friends: users,
            acceptFriend: acceptusers
        }, 
        {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + this.keyAuth
            })
        })
    }

    removeAdd(id:number, users) {
        return this.http.put(`${environment.strpUrl}${this.USERS_URL}/${id}`,
        {
            addFriend: users
        }, 
        {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + this.keyAuth
            })
        })
    }

    removeAccept(id:number, users) {
        return this.http.put(`${environment.strpUrl}${this.USERS_URL}/${id}`,
        {
            acceptFriend: users
        }, 
        {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + this.keyAuth
            })
        })
    }

    requestForAdd(id:number, user) {
        return this.http.put(`${environment.strpUrl}${this.USERS_URL}/${id}`,
        {
            acceptFriend: user
        }, 
        {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + this.keyAuth
            })
        })
    }

    clearStore() {
        this.usersStore.remove()
    }
    
}