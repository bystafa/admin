import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutPageComponent } from './pages/admin-layout-page/admin-layout-page.component';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { EditPageComponent } from './pages/edit-page/edit-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { FriendsPageComponent } from './pages/friends-page/friends-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MainLayoutPageComponent } from './pages/main-layout-page/main-layout-page.component';
import { PostPageComponent } from './pages/post-page/post-page.component';
import { RegistrComponent } from './pages/registr/registr.component';
import { UserPageComponent } from './pages/user-page/user-page.component';

const routes: Routes = [
{
    path: 'auth',
    component: AdminLayoutPageComponent,
    children: [
      {
        path: '',
        redirectTo: '/auth',
        pathMatch: 'full'
      },
      {
        path: '',
        component: AuthPageComponent
      },
      {
        path: 'register',
        component: RegistrComponent
      }
    ]
},
{
  path: '', 
  component: MainLayoutPageComponent,
  children: [
    {
      path: '',
      redirectTo: '/',
      pathMatch: 'full' 
    },
    {
      path: '',
      component: HomePageComponent
    },
    {
      path: 'user',
      children: [{
        path: '',
        redirectTo: '/',
        pathMatch: 'full'
      },
      {
        path: 'edit',
        component: EditPageComponent
      },
      {
        path: 'friends',
        component: FriendsPageComponent
      },
      {
        path: ':username',
        component: UserPageComponent
      }
    ]
    },
    {
      path: ':id',
      component: PostPageComponent
    }
  ]
},
{
  path: 'error',
  component: ErrorPageComponent
},
{
  path: '**',
  redirectTo: '/error'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
