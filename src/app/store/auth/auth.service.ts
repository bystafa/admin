import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Login } from "src/app/pages/auth-page/auth-page.component";
import { Auth } from "./auth.model";
import { AuthStore } from "./auth.store";
import { tap } from "rxjs/operators"
import { SetEntities } from "@datorama/akita/lib/setEntities";
import { environment } from "src/environments/environment";
import { BaseUrl } from "src/app/baseUrl";

@Injectable({providedIn: 'root'})
export class AuthService extends BaseUrl {
    constructor(private AuthStore: AuthStore, private http: HttpClient){super()}

    getAuth(login: Login) {
        return this.http.post(environment.strpUrl + this.AUTH_URL, login)
        .pipe(
            tap((entitier: SetEntities<Auth>) => this.AuthStore.set(entitier))
        )
    }

    clearStore() {
        this.AuthStore.remove()
    }
}