import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CommentsQuery, Comment } from 'src/app/store/comments';
import { Post, PostsQuery } from 'src/app/store/posts';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  comments$: Observable<Comment[]>
  post$: Observable<Post>
  text = ''
  sent = false

  constructor(private postsQuery: PostsQuery, private commentsQuery: CommentsQuery, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.post$ = this.route.params
    // .pipe(switchMap((params: Params) => {
    //   return this.postsQuery.getPost(+params['id'])
    // }))
    this.comments$ = this.route.params
    .pipe(switchMap((params: Params) => {
      return this.commentsQuery.getComments(+params['id'])
    }))
  }

  changeComment() {

  }

  deleteComment() {

  }

  addComment() {

  }

}
