import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/core.module';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../../shared/components/login/login.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo:'login', pathMatch:'full'}
];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})

export class AuthModule { }
