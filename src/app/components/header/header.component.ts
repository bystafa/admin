import { Component, OnInit } from '@angular/core';
import { Auth, AuthQuery, AuthService, AuthState } from 'src/app/store/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  user: string

  constructor(private authService: AuthService, private authQuery: AuthQuery) { }

  ngOnInit(): void {
    this.authQuery.select().subscribe((elem) => {
      if (elem.entities.user) {
        localStorage.setItem('user', elem.entities.user.username.toString())
        localStorage.setItem('jwt', elem.entities.jwt.toString())
      }
    })
    this.user = '' || localStorage.getItem('user')
  }

  logOut() {
    this.user = ''
    this.authService.clearStore()
    localStorage.removeItem('user')
    localStorage.removeItem('jwt')
  }

}
