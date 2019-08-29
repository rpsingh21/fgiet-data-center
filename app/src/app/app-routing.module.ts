import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { FeeRegistrationComponent } from "./fee-registration/fee-registration.component";
import { FeeFormDetailComponent } from "./fee-form-detail/fee-form-detail.component";
import { FeeDashboardComponent } from "./admin/fee-dashboard/fee-dashboard.component";
import { LoginComponent } from "./admin/login/login.component";

import { AuthGuard } from "./auth.guard";

const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "fee/registration", component: FeeRegistrationComponent },
    { path: "fee/form/:token", component: FeeFormDetailComponent },
    {
        path: "admin",
        component: FeeDashboardComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "admin/fee/details/:id",
        component: FeeFormDetailComponent,
        canActivate: [AuthGuard]
    },
    { path: "admin/login", component: LoginComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { scrollPositionRestoration: "enabled" })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
