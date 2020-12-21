import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Login } from "src/app/pages/auth-page/auth-page.component";
import { UsersStore } from "./users.store";
import { tap } from 'rxjs/operators'
import { Auth } from "../auth";
import { Users } from "./users.model";
import { SetEntities } from "@datorama/akita/lib/setEntities";

@Injectable({providedIn: 'root'})
export class UsersService {
    constructor(private usersStore: UsersStore, private http: HttpClient){}

    keySuperAdmin = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjA4MjM3NDc1LCJleHAiOjE2MTA4Mjk0NzV9.ne1ZyUMTnqyD2kgFaviMBWSz_vp_ORW2MvGYuZ5JElU'

    // loginAdmin() {
    //     const superAdmin: Login = {
    //         identifier: 'steamgame97@mail.ru',
    //         password: '123456bbB'
    //     }
    //     return this.http.post('http://localhost:1337/auth/local', superAdmin)
    //     .pipe(
    //         tap((elem: Auth) => localStorage.setItem('superAdmin', elem.jwt))
    //     )
    // }

    getUsers() {
        console.log(localStorage.getItem('superAdmin'))
        return this.http.get('http://localhost:1337/users', {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + this.keySuperAdmin
            })
        })
        .pipe(
            tap((entities: SetEntities<Users>)=> this.usersStore.set(entities))
        )
    }

    uploadPhoto(data: FormData) {
        return this.http.post('http://localhost:1337/upload', data, {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            })
        })
    }

    changeDataUser(id: number, data: Users) {
        this.usersStore.update(id, data)
        return this.http.put(`http://localhost:1337/users/${id}`, 
        // {
        //     username: data.username,
        //     email: data.email,
        //     firstName: data.firstName,
        //     lastName: data.lastName,
        //     birthday: data.birthday,
        //     phone: data.phone,
        //     city: data.city,
        //     addr: data.addr
        // }
        data, 
        {
        headers: new HttpHeaders({
            'Authorization': 'Bearer ' + this.keySuperAdmin
        })
        })
    }

    clearStore() {
        //localStorage.removeItem('superAdmin')
        this.usersStore.remove()
    }
    
}