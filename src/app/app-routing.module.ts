import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ChatComponent } from './chat/chat.component';
import { RequestsComponent } from "./requests/requests.component";
import { NewCarComponent } from "./car/new-car/new-car.component";
import { CarComponent } from "./car/car.component";
import { CommentComponent } from './comment/comment.component';
import { OccupationComponent } from './car/occupation/occupation.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'requests', component: RequestsComponent },
  { path: 'car', component: CarComponent },
  { path: 'new-car', component: NewCarComponent },
  { path: 'comments', component: CommentComponent },
  { path: 'occupation', component: OccupationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
