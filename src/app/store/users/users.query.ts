import { Injectable } from "@angular/core";
import { EntityUIQuery, QueryEntity } from "@datorama/akita";
import { fromEventPattern } from "rxjs";
import { UsersState, UsersStore } from "./users.store";
import { filter, map } from "rxjs/operators"
import { Users } from "./users.model";

@Injectable({providedIn: 'root'})
export class UsersQuery extends QueryEntity<UsersState> {
    
    user: Users

    constructor(protected store: UsersStore) {
        super(store);
    }
    
    getByParam(name: string) {
        // return this.selectAll().pipe(
        //     map(
        //         (response: {[key: string]: any}) => {
        //         return Object
        //           .keys(response)
        //           .map(key => ({
        //             ...response[key]
        //           }))
        //           .filter(p => p.username === name)
        //     })
        // )
        // 2.return this.selectEntity((entities)=> entities.username === name)
        return this.selectAll({
            filterBy:(entities) => entities.username === name

        })
    }
    
    getinfostore() {
        return this.selectAll({
            filterBy: (entities) => {
                console.log(entities)
                return entities.username !== ''
            }
        })
    }

    getValueByParam(name: string) {
        return this.selectEntity((entities)=> entities.username === name)
    }
}
