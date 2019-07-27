import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { FeeRegistrationComponent } from "./fee-registration/fee-registration.component";
import { FeeFormDetailComponent } from "./fee-form-detail/fee-form-detail.component";
import { FeeDashboardComponent } from "./admin/fee-dashboard/fee-dashboard.component";
import { LoginComponent } from "./admin/login/login.component";

const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "fee/registration", component: FeeRegistrationComponent },
    { path: "fee/details/:id", component: FeeFormDetailComponent },
    { path: "fee/form/:token", component: FeeFormDetailComponent },
    { path: "admin", component: FeeDashboardComponent },
    { path: "admin/login", component: LoginComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
