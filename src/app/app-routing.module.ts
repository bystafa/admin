import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutPageComponent } from './pages/admin-layout-page/admin-layout-page.component';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MainLayoutPageComponent } from './pages/main-layout-page/main-layout-page.component';
import { PostPageComponent } from './pages/post-page/post-page.component';

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
      path: ':id',
      component: PostPageComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
