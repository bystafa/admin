import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, Auth } from 'src/app/store/auth';

export interface Login {
  identifier: string
  password: string
}
@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements OnInit {

  user: Login
  error = ''
  login = ''
  password = ''

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    
  }

  logIn() {
    this.user = {
      identifier: this.login,
      password: this.password
    }
    this.authService.getAuth(this.user).subscribe(
      null, 
      error => this.error = error.error.message[0].messages[0].message,
      () => this.router.navigate(['/'])
    )
  }
}
