import { ThrowStmt } from '@angular/compiler';
import { Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CommentsQuery, Comment, CommentsService } from 'src/app/store/comments';
import { Post, PostsQuery } from 'src/app/store/posts';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit, DoCheck {

  comments$: Observable<Comment[]>
  post$: Observable<Post[]>
  comment: Comment
  sent = true
  user = ''
  text = ''
  id = 0

  constructor(private postsQuery: PostsQuery, 
              private commentsQuery: CommentsQuery, 
              private route: ActivatedRoute, 
              private CommentsService: CommentsService) { }

  ngOnInit(): void {
    this.user = localStorage.getItem('user')
    this.getPost()
    this.getComments()
  }

  ngDoCheck(): void {
    this.user = localStorage.getItem('user')
  }

  getPost(): void{
    this.post$ = this.route.params
    .pipe(switchMap((params: Params) => {
      return this.postsQuery.getPost(+params['id'])
    }))
  }

  getComments(): void {
    this.comments$ = this.route.params
    .pipe(switchMap((params: Params) => {
      return this.commentsQuery.getComments(+params['id'])
    }))
  }

  changeComment(id: number, text: string): void {
    this.text = text
    this.sent = false
    this.id = id
  }

  deleteComment(id: number): void {
    this.CommentsService.deleteComment(id).subscribe(null, null, () => {
      this.getComments()
    })
  }

  addComment(idPost: number): void {
    if (this.sent) {
      this.comment = {
        id: +new Date(),
        author: localStorage.getItem('user'),
        text: this.text,
        date: new Date,
        post: {
          id: idPost
        }
      }
      this.CommentsService.addComment(this.comment).subscribe(null,null,
        () => {
          this.getComments()
        })
    }
    else {
      this.CommentsService.changeComment(this.id, this.text).subscribe(null,null,
        () => {
          this.getComments()
        })
    }
    this.sent = true
    this.text = ''
  }

}
