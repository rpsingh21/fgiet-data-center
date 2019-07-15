import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component'
import { FeeRegistrationComponent } from './fee-registration/fee-registration.component'


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'fee/registration', component: FeeRegistrationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
