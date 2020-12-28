import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MyValidators } from './my.validators';
import {regions} from '../../russia'
import { UsersQuery, Users, UsersService } from 'src/app/store/users';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {

  form: FormGroup
  region = regions
  selectedFile: File
  idUser: number
  imgUrl: string
  user$: Observable<Users[]>
  message:string
  urlHost = environment.strpUrl

  constructor(private UsersQuery: UsersQuery, private UsersService: UsersService, private Router: Router) { }

  ngOnInit(): void {
    this.region.sort((a, b)=> {
      let cityA = a.city.toLowerCase(),
        cityB = b.city.toLowerCase()
        if (cityA < cityB) return -1
        else if (cityA > cityB) return 1
        return 0 
    })
    this.form = new FormGroup({
      firstName: new FormControl('',[Validators.minLength(3), Validators.required, MyValidators.correctName]),
      lastName: new FormControl('',[Validators.minLength(3), Validators.required, MyValidators.correctName]),
      phone: new FormControl('', [MyValidators.correctPhone]),
      email: new FormControl('', [Validators.email, Validators.required]),
      birthday: new FormControl('', [MyValidators.correctDate]),
      city: new FormControl(''),
      addr: new FormControl(''),
      img: new FormControl()
    })
    
    this.UsersQuery.getByParam(localStorage.getItem('user')).subscribe((resp) =>  {
      resp.forEach((elem) => {
        this.idUser = elem.id
        this.form.setValue({
          firstName: elem.firstName || '',
          lastName: elem.lastName || '',
          phone: elem.phone || '',
          email:  elem.email || '',
          birthday: elem.birthday || '',
          city: elem.city || '',
          addr: elem.addr || '',
          img: elem.img || ''
      })
      if (elem.img) {
        this.imgUrl = elem.img.url
      }
    })    
  })
}

  ngDoCheck(): void {
    if (!localStorage.getItem('user')) {
      this.Router.navigate(['/'])
    }
  }

  clear() {
    this.form.patchValue({addr: ''})
  }
  
  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0]
  }

  uploadPhoto() {
    const data = new FormData()
    data.append('files', this.selectedFile)
    this.UsersService.uploadPhoto(data).subscribe((resp)=> this.form.patchValue({img: resp[0]}),null,()=> {
      this.message = 'Загружено!'
      this.imgUrl = this.form.value.img.url
    })
  }
  edit() {
    this.UsersService.changeDataUser(this.idUser, this.form.value).subscribe(
      null,null, ()=> {
        this.UsersService.setDataIfSuccess(this.idUser, this.form.value)
        this.Router.navigate(['/user', localStorage.getItem('user')])
      }
    )
  }
}
