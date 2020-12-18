import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MyValidators } from './my.validators';
import {regions} from '../../russia'
import { UsersQuery, Users } from 'src/app/store/users';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {

  form: FormGroup
  region = regions
  user: Users

  constructor(private UsersQuery: UsersQuery) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      firstName: new FormControl('',[Validators.minLength(3), Validators.required, MyValidators.correctName]),
      lastName: new FormControl('',[Validators.minLength(3), Validators.required, MyValidators.correctName]),
      phone: new FormControl('', [MyValidators.correctPhone]),
      email: new FormControl('', [Validators.email, Validators.required]),
      date: new FormControl('', [MyValidators.correctDate]),
      place: new FormGroup({
        city: new FormControl(''),
        region: new FormControl('')
      }),
      img: new FormControl('')
    })

  }
  edit() {
      console.log(this.form.value)
  }
}
