import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/core.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})

export class AuthModule { }
