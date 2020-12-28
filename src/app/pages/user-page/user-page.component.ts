import { Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Comment, CommentsQuery } from 'src/app/store/comments';
import { UsersQuery, Users, UsersService } from 'src/app/store/users';
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit, DoCheck {

  info: Users
  currentUserName = ''
  currentUser: Observable<Users[]>
  user$: Observable<Users[]>
  urlHost = environment.strpUrl

  constructor(private UsersQuery: UsersQuery, private route: ActivatedRoute, private UsersService: UsersService) { }

  ngOnInit(): void {
    // this.currentUser = this.UsersQuery.getByParam(localStorage.getItem('user'))
    // this.currentUser.subscribe((resp) => {
    //   resp.forEach((elem)=> {
    //     this.info = elem
    //   })
    // })
    this.currentUser = this.UsersQuery.getinfostore()
    this.UsersQuery.getinfostore().subscribe()
    this.user$ = this.route.params
    .pipe(switchMap((params: Params) => {
      return this.UsersQuery.getByParam(params['username'])
    }))
    this.currentUserName = localStorage.getItem('user')
  }

  ngDoCheck(): void {
    this.currentUserName = localStorage.getItem('user')
  }

  addFriend(id:number, acceptList, user){ 
    acceptList = Object.assign([], acceptList)
    acceptList.push(this.info)
    let arr = this.info.addFriend // не знаю зачем, по другому не сработало
    arr = Object.assign([], arr)
    arr.push(user)
    this.UsersService.requestForAdd(id, acceptList).subscribe(null, null, () => {
      this.UsersService.setDataIfSuccess(id, acceptList, 'addFriend', this.info.id, arr)
    })
  }
}
