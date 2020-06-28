import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ChatComponent } from './chat/chat.component';
import { RequestsComponent } from './requests/requests.component';
import { NewCarComponent } from './car/new-car/new-car.component';
import { CarComponent } from './car/car.component';
import { OccupationComponent } from './car/occupation/occupation.component';

import { CarService } from './car/shared/car.service';
import { RequestService } from './requests/shared/request.service';
import { AuthService } from './auth/shared/auth.service';
import { ChatService } from './chat/shared/chat.service';
import { AuthInterceptor } from './http-interceptors/auth-interceptor';
import { CommentComponent } from './comment/comment.component';
import { PastRequestsComponent } from './requests/past-requests/past-requests.component';
import { StatisticsComponent } from './car/statistics/statistics.component';
import { HomepageAdminComponent } from './homepage/homepage-admin/homepage-admin.component';
import { HomepageUsersComponent } from './homepage/homepage-users/homepage-users.component';
import { HomepageUnregistredComponent } from './homepage/homepage-unregistred/homepage-unregistred.component';
import { SearchComponent } from './search/search.component';
import { UsersComponent } from './auth/users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ChatComponent,
    RequestsComponent,
    NewCarComponent,
    CarComponent,
    OccupationComponent,
    CommentComponent,
    PastRequestsComponent,
    StatisticsComponent,
    HomepageAdminComponent,
    HomepageUsersComponent,
    HomepageUnregistredComponent,
    SearchComponent,
    UsersComponent,
  ],
  imports: [NgbModule, BrowserAnimationsModule, BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule,
            ToastrModule.forRoot({
              timeOut: 3000,
              preventDuplicates: true,
              resetTimeoutOnDuplicate: true,
              progressBar: true,
              enableHtml: true
            })],
  providers: [CarService, RequestService, AuthService, ChatService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },],
  bootstrap: [AppComponent],
})
export class AppModule { }
