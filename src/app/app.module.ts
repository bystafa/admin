import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { PostPageComponent } from './pages/post-page/post-page.component';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { PostComponent } from './components/post/post.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/header/header.component';
import { MainLayoutPageComponent } from './pages/main-layout-page/main-layout-page.component';
import { AdminLayoutPageComponent } from './pages/admin-layout-page/admin-layout-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { EditPageComponent } from './pages/edit-page/edit-page.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaskModule, IConfig } from 'ngx-mask';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    PostPageComponent,
    AuthPageComponent,
    PostComponent,
    HeaderComponent,
    MainLayoutPageComponent,
    AdminLayoutPageComponent,
    UserPageComponent,
    EditPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    NgxMaskModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
