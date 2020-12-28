import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/store/users';
import { MyValidators } from '../edit-page/my.validators';

@Component({
  selector: 'app-registr',
  templateUrl: './registr.component.html',
  styleUrls: ['./registr.component.scss']
})
export class RegistrComponent implements OnInit {

  form: FormGroup

  constructor(private UsersService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      firstName: new FormControl('',[Validators.minLength(3), Validators.required, MyValidators.correctName]),
      lastName: new FormControl('',[Validators.minLength(3), Validators.required, MyValidators.correctName]),
      email: new FormControl('', [Validators.email, Validators.required]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  edit() {
    this.UsersService.createUser(this.form.value).subscribe(null, null, () => {
      this.UsersService.addDataIfSuccess(this.form.value)
      this.router.navigate(['/'])
    })
  }
}
