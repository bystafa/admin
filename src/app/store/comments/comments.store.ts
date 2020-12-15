import { Injectable } from "@angular/core";
import { EntityState, EntityStore, StoreConfig } from "@datorama/akita";

export interface CommentsState extends EntityState<Comment> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({
    name: 'comments'
})
export class CommentsStore extends EntityStore<CommentsState> {
    constructor() {
        super();
    }
}