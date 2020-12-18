import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommentsService } from 'src/app/store/comments';
import { PostsService } from 'src/app/store/posts';
import { UsersService } from 'src/app/store/users';

@Component({
    selector: 'app-main-layout-page',
    templateUrl: './main-layout-page.component.html',
    styleUrls: ['./main-layout-page.component.scss']
})
export class MainLayoutPageComponent implements OnInit, OnDestroy {

  constructor(private PostsService: PostsService, private CommentsService: CommentsService, private UsersService: UsersService) {}

  ngOnInit(): void {
    this.PostsService.loadPosts().subscribe()
    this.CommentsService.loadComments().subscribe()
    //this.UsersService.loginAdmin().subscribe()
    this.UsersService.getUsers().subscribe()
  }

  ngOnDestroy(): void {
    this.PostsService.clearStore()
    this.CommentsService.clearStore()
    this.UsersService.clearStore()
  }
}
