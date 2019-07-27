import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { ApiService } from "./api.service";
import { AuthGuard } from "./auth.guard";
import { AppComponent } from "./app.component";
import { FeeRegistrationComponent } from "./fee-registration/fee-registration.component";
import { HomeComponent } from "./home/home.component";
import { HeaderComponent } from "./header/header.component";
import { FeeFormDetailComponent } from "./fee-form-detail/fee-form-detail.component";
import { FeeDashboardComponent } from "./admin/fee-dashboard/fee-dashboard.component";
import { LoginComponent } from "./admin/login/login.component";

@NgModule({
    declarations: [
        AppComponent,
        FeeRegistrationComponent,
        HomeComponent,
        HeaderComponent,
        FeeFormDetailComponent,
        FeeDashboardComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    providers: [ApiService, AuthGuard],
    bootstrap: [AppComponent]
})
export class AppModule {}
