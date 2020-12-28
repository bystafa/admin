import { Component, DoCheck, OnInit, ɵConsole } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Users, UsersQuery, UsersService } from 'src/app/store/users';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-friends-page',
  templateUrl: './friends-page.component.html',
  styleUrls: ['./friends-page.component.scss']
})
export class FriendsPageComponent implements OnInit, DoCheck {

  user$: Observable<Users[]>
  acceptFriends = []
  addFriends = []
  friends = []
  idUser = 0
  urlHost = environment.strpUrl

  constructor(private Router: Router, private UsersQuery: UsersQuery, private UsersService: UsersService) { }

  ngOnInit(): void {
    this.user$ = this.UsersQuery.getByParam(localStorage.getItem('user'))
    this.user$.subscribe((resp) => resp.forEach((elem) => {
      this.idUser = elem.id
      this.acceptFriends= elem.acceptFriend
      this.friends = elem.friends
      this.addFriends = elem.addFriend
    }))
  }

  ngDoCheck(): void {
    if (!localStorage.getItem('user')) {
      this.Router.navigate(['/'])
    }
  }

  removeFriend(username: string) {
    let idSecondUser = 0
    let friendsSecond = []  //создаем список чтобы держать там друзей второго
    //let addFriendSecond = [] //создаем список чтобы там держать заявки на добавления(исходящие от второго юзера(того которого мы хотим удалить)) в друзья второго юзера
    this.UsersQuery.getByParam(username).subscribe((resp)=> { //заполняем эти списки
      resp.forEach((elem)=> {
        idSecondUser = elem.id
        friendsSecond = elem.friends  
        //addFriendSecond = elem.addFriend
      })
    })
    //по хорошему это должно быть после того как стрим отработает, но он почему то не заканчивает:(
    this.friends = this.friends.filter((elem) => elem.username !== username)  //в наших друзьях убираем кого хотим удалить
    //let infoAboutUser = friendsSecond.forEach((elem) => elem.username === localStorage.getItem('user')) // получаем информацию о себе
    //addFriendSecond.push(infoAboutUser) // закидываем в заявки на добавления(чтобы он мог отписаться от меня)
    friendsSecond = friendsSecond.filter((elem) => elem.username !== localStorage.getItem('user')) //получаем список друзей без меня второго пользователя
    this.UsersService.addOrRemoveFriend(this.idUser, this.friends).subscribe(null,null,()=> { //кидаем запрос на удаление
      this.UsersService.addOrRemoveFriend(idSecondUser, friendsSecond).subscribe()
      this.UsersService.setDataIfSuccess(this.idUser, this.friends, 'remove', idSecondUser, friendsSecond)
    })
  }

  removeAccept(username: string) {
    let idSecondUser = 0
    let addFriendsSecond = []
    this.UsersQuery.getByParam(username).subscribe((resp)=> { 
      resp.forEach((elem)=> {
        idSecondUser = elem.id
        addFriendsSecond = elem.addFriend
      })
    })
    addFriendsSecond = addFriendsSecond.filter((elem)=> elem.username !== localStorage.getItem('user'))
    this.acceptFriends = this.acceptFriends.filter((elem) => elem.username !== username)
    this.UsersService.removeAccept(this.idUser, this.acceptFriends).subscribe(null,null,()=> {
      this.UsersService.setDataIfSuccess(this.idUser, this.addFriends, 'removeAccept', idSecondUser, addFriendsSecond)
    })
  }

  removeAdd(username: string) {
    let idSecondUser = 0
    let acceptFriendsSecond = []
    this.UsersQuery.getByParam(username).subscribe((resp)=> { 
      resp.forEach((elem)=> {
        idSecondUser = elem.id
        acceptFriendsSecond = elem.acceptFriend
      })
    })
    acceptFriendsSecond = acceptFriendsSecond.filter((elem)=> elem.username !== localStorage.getItem('user'))
    this.addFriends = this.addFriends.filter((elem) => elem.username !== username)
    this.UsersService.removeAdd(this.idUser, this.addFriends).subscribe(null,null,()=> {
      this.UsersService.setDataIfSuccess(this.idUser, this.addFriends, 'removeAdd', idSecondUser, acceptFriendsSecond)
    })
  }

  addFriend(username: string) {//убрать заявку у второго который кинул и у меня который принял
    let idSecondUser = 0
    let friendsSecond = []
    let addFriendSecond = []  
    this.UsersQuery.getByParam(username).subscribe((resp)=> { //заполняем эти списки
      console.log(resp)
      resp.forEach((elem)=> {
        console.log('заполнение массивов')
        idSecondUser = elem.id
        friendsSecond = elem.friends 
        addFriendSecond = elem.addFriend
        console.log('массив получен', addFriendSecond)
      })
    })
    let arr = this.acceptFriends.filter((elem) => elem.username === username) // выбираю инфу о втором юзере
    this.friends = Object.assign([], this.friends);
    this.friends.push(arr.pop()) //закидываю в свой список друзей
    arr = addFriendSecond.filter((elem) => elem.username === localStorage.getItem('user'))
    addFriendSecond = addFriendSecond.filter((elem) => elem.username !== localStorage.getItem('user')) //убираем меня из заявок второго
    this.acceptFriends = this.acceptFriends.filter((elem)=> elem.username !== username)
    friendsSecond = Object.assign([], friendsSecond);
    friendsSecond.push(arr.pop())
    this.UsersService.addOrRemoveFriend(this.idUser, this.friends, this.acceptFriends).subscribe(null,null,()=> {
      this.UsersService.addOrRemoveFriend(idSecondUser, friendsSecond).subscribe()
      this.UsersService.setDataIfSuccess(this.idUser, this.friends, 'add',idSecondUser, this.acceptFriends, friendsSecond, addFriendSecond)
    })
  }
}
