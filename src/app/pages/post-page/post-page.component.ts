import { Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CommentsQuery, Comment, CommentsService } from 'src/app/store/comments';
import { Post, PostsQuery } from 'src/app/store/posts';
import { Users, UsersQuery } from 'src/app/store/users';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit, DoCheck {

  comments$: Observable<Comment[]>
  post$: Observable<Post[]>
  user$: Observable<Users[]>
  sent = true
  user = ''
  text = ''
  id = 0
  urlHost = environment.strpUrl

  constructor(private postsQuery: PostsQuery, 
              private commentsQuery: CommentsQuery, 
              private route: ActivatedRoute, 
              private CommentsService: CommentsService,
              private UsersQuery: UsersQuery) { }

  ngOnInit(): void {
    this.user = localStorage.getItem('user')
    this.getPost()
    this.getComments()
    this.user$ = this.UsersQuery.selectAll()
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
      this.CommentsService.setDataIfSuccess('delete', id)
      this.getComments()
    })
  }

  addComment(idPost: number): void {
    if (this.sent && this.text) {
      this.CommentsService.addComment(idPost, this.text).subscribe(null,null,
        () => {
          this.CommentsService.setDataIfSuccess('add')
          this.CommentsService.loadComments().subscribe(null, null,() => {this.getComments()}) // strapi меняет id на свой, приходится получать заново инфу
          this.text = ''
        })
    }
    else {
      this.CommentsService.changeComment(this.id, this.text).subscribe(null,null,
        () => {
          this.CommentsService.setDataIfSuccess('change',this.id, this.text)
          this.getComments()
          this.text = ''
        })
    }
    this.sent = true
  }

}
