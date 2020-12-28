import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post, PostsQuery, PostsService } from 'src/app/store/posts';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit{

  urlHost = environment.strpUrl

  posts$: Observable<Post[]>

  constructor(private postsQuery: PostsQuery) { }

  ngOnInit(): void {
    this.posts$ = this.postsQuery.selectAll()
  }

}
