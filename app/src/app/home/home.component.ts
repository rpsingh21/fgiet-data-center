import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { ApiService } from "../api.service";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
    regForm;
    rePrintForm;
    submitted = false;
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private api: ApiService
    ) {
        this.regForm = this.formBuilder.group({
            roll_no: [
                "",
                [Validators.required, Validators.pattern("^[0-9]{8,}$")]
            ],
            email: ["", [Validators.required, Validators.email]]
        });
        this.rePrintForm = this.formBuilder.group({
            form_id: ["", Validators.required],
            dob: ["", Validators.required]
        });
    }

    ngOnInit() {}

    get f() {
        return this.regForm.controls;
    }

    get ff() {
        return this.rePrintForm.console;
    }

    submitRegForm(value) {
        this.submitted = true;
        if (this.regForm.invalid) {
            return;
        }
        console.log(value);
        this.router.navigate(["fee", "registration"], { queryParams: value });
    }

    submitRePrintForm(value) {
        console.log("hello", value);
        if (this.rePrintForm.invalid) {
            return;
        }
        console.log("submit");
    }
}
