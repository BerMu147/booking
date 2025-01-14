import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/core.module';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../../shared/components/login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo:'login', pathMatch:'full'},
  {path: 'register', component: RegisterComponent}
];

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})

export class AuthModule { }
