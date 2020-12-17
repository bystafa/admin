import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  form: FormGroup
  message = ''

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      login: new FormControl(null, [
        Validators.required,
        Validators.minLength(5)
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ])
    })
  }

  logIn() {
    const user: Login = {
      identifier: this.form.value.login,
      password: this.form.value.password
    }
    this.authService.getAuth(user).subscribe(
      null, 
      error => {
        switch (error.error.message[0].messages[0].message) {
          case 'Identifier or password invalid.': {
            this.message = 'Неверный идентификатор или пароль.'
            break
          }
          default: this.message = "Другая ошибка. Я её не знаю."
        }
      },
      () => {
        this.form.reset()
        this.router.navigate(['/'])
      })
  }
  // logIn() {
  //   this.user = {
  //     identifier: this.login,
  //     password: this.password
  //   }
  //   this.authService.getAuth(this.user).subscribe(
  //     null, 
  //     error => this.error = error.error.message[0].messages[0].message,
  //     () => this.router.navigate(['/'])
  //   )
  // }
}
