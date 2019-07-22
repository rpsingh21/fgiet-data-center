import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component'
import { FeeRegistrationComponent } from './fee-registration/fee-registration.component'
import { FeeFormDetailComponent } from './fee-form-detail/fee-form-detail.component'


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'fee/registration', component: FeeRegistrationComponent },
  { path: 'fee/details/:id', component: FeeFormDetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
