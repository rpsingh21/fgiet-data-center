import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { ApiService } from "../../api.service";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
    loginForm;
    submitted;
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private api: ApiService
    ) {
        this.loginForm = this.formBuilder.group({
            username: ["", Validators.required],
            password: ["", Validators.required],
        });
    }

    ngOnInit() {}

    get f() {
        return this.loginForm.controls;
    }

    login(value: any) {
        this.submitted = true;
        console.log(value);
        this.api.post(`login/`, value).subscribe((res) => {
            for (let key in res) {
                localStorage.setItem(key, res[key]);
            }
            this.router.navigate(["admin"]);
        });
    }
}
