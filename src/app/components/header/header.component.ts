import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  user = ''
  auth = false

  constructor() { }

  ngOnInit(): void {
  }

  logIn() {}

  logOut() {}

}
