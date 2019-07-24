import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
    regForm;
    rePrintForm;
    constructor(private formBuilder: FormBuilder, private router: Router) {
        this.regForm = this.formBuilder.group({
            roll_no: "",
            email: ""
        });
        this.rePrintForm = this.formBuilder.group({
            form_id: "",
            dob: ""
        });
    }

    ngOnInit() {}

    submitRegForm(value) {
        console.log(value, this.regForm);
        if (value.roll_no && value.email) {
            this.router.navigate(["fee", "registration"], value);
        }
    }

    submitRePrintForm(value) {
        console.log("hello", value);
    }
}
