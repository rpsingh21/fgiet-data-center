import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { ApiService } from "../api.service";
import { fee_form, fee_form_errors } from "../data";

@Component({
    selector: "app-fee-registration",
    templateUrl: "./fee-registration.component.html",
    styleUrls: ["./fee-registration.component.scss"]
})
export class FeeRegistrationComponent implements OnInit {
    objectKeys = Object.keys;
    data = fee_form;
    errors = fee_form_errors;
    optionsData: any;

    constructor(private api: ApiService, private router: Router) {}

    ngOnInit() {
        this.data.semesters = [];
        for (let i = 1; i < 9; i++) {
            this.data.semesters.push({
                semester: 1,
                marks: null,
                total_marks: null
            });
        }
        // this.api.get('fee/details/16').subscribe((res:any)=>{
        //     this.data = res.details;
        // })
        this.api.get("fee/form-details").subscribe((res: any) => {
            this.optionsData = res;
        });
    }

    onUpload(event) {
        if (event.target.files.length > 0) {
            const formData = new FormData();
            const file = event.target.files[0];
            formData.append("upload", file);
            this.api.post("student/upload", formData).subscribe(
                (res: any) => {
                    this.data.basic["image"] = res.upload;
                    this.errors.basic.image = null;
                },
                (error: any) => {
                    if (error.status == 400) {
                        if (this.errors.basic == null) {
                            this.errors.basic = {};
                        }
                        this.errors.basic.image = error.error.upload;
                    }
                }
            );
        }
    }

    onSumitForm() {
        this.api.post("fee/", this.data).subscribe(
            (res: any) => {
                this.router.navigate(["fee", "details", res.id]);
            },
            (error: any) => {
                if (error.status == 400) {
                    this.errors = error.error;
                }
            }
        );
    }
}
