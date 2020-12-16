import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Login } from "src/app/pages/auth-page/auth-page.component";
import { Auth } from "./auth.model";
import { AuthStore } from "./auth.store";
import { tap } from "rxjs/operators"
import { SetEntities } from "@datorama/akita/lib/setEntities";

@Injectable({providedIn: 'root'})
export class AuthService {
    constructor(private AuthStore: AuthStore, private http: HttpClient){}

    getAuth(login: Login) {
        return this.http.post('http://localhost:1337/auth/local', login)
        .pipe(
            tap((entitier: SetEntities<Auth>) => this.AuthStore.set(entitier))
        )
    }

    clearStore() {
        this.AuthStore.remove()
    }
}