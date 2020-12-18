import { Injectable } from "@angular/core";
import { EntityState, EntityStore, StoreConfig } from "@datorama/akita";
import { Users } from "./users.model";

export interface UsersState extends EntityState<Users> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({
    name: 'comments'
})
export class UsersStore extends EntityStore<UsersState> {
    constructor() {
        super();
    }
}