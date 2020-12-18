import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersQuery, Users } from 'src/app/store/users';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  user$: Observable<Users[]>

  constructor(private UsersQuery: UsersQuery) { }

  ngOnInit(): void {
    this.user$ = this.UsersQuery.getByLogin()
  }

}
