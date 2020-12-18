import { Injectable } from "@angular/core";
import { QueryEntity } from "@datorama/akita";
import { fromEventPattern } from "rxjs";
import { UsersState, UsersStore } from "./users.store";
import { filter, map } from "rxjs/operators"
import { Users } from "./users.model";

@Injectable({providedIn: 'root'})
export class UsersQuery extends QueryEntity<UsersState> {
    
    constructor(protected store: UsersStore) {
        super(store);
    }
    
    getByLogin() {
        return this.selectAll().pipe(
            map((response: {[key: string]: any}) => {
                return Object
                  .keys(response)
                  .map(key => ({
                    ...response[key]
                  }))
                  .filter(p => p.username === localStorage.getItem('user'))
            })
        )
    }
}
