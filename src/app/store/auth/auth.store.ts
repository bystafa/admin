import { Injectable } from "@angular/core";
import { EntityState, EntityStore, StoreConfig } from "@datorama/akita";
import { Auth } from "./auth.model";

export interface AuthState extends EntityState<Auth> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({
    name: 'comments'
})
export class AuthStore extends EntityStore<AuthState> {
    constructor() {
        super();
    }
}