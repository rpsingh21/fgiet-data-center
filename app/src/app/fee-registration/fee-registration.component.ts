import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

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
    is_semester = true;
    spinner = { image: false, form: false };

    constructor(
        private api: ApiService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.change_semester_table();
        const roll_no = this.route.snapshot.queryParamMap.get("roll_no");
        const email = this.route.snapshot.queryParamMap.get("email");
        if (!(roll_no && email)) {
            this.router.navigate(["/"]);
        }
        this.data.basic.roll_no = roll_no;
        this.data.basic.email = email;
        this.api.get("fee/form-details").subscribe((res: any) => {
            this.optionsData = res;
        });
    }

    onUpload(event) {
        if (event.target.files.length > 0) {
            this.spinner.image = true;
            const formData = new FormData();
            const file = event.target.files[0];
            formData.append("upload", file);
            if (this.errors.basic == null) {
                this.errors.basic = {};
            }
            this.api.post("student/upload", formData).subscribe(
                (res: any) => {
                    this.data.basic["image"] = res.upload;
                    this.errors.basic.image = null;
                },
                (error: any) => {
                    if (error.status == 400) {
                        this.errors.basic.image = error.error.upload;
                    }
                    this.spinner.image = false;
                },
                () => {
                    this.spinner.image = false;
                }
            );
        }
    }

    onSumitForm() {
        this.spinner.form = true;
        this.data.academics = this.data.academics.filter(el => {
            return el.board && el.marks;
        });
        this.api.post("fee/", this.data).subscribe(
            (res: any) => {
                const formData = {
                    dob: res.details.basic.dob,
                    form_id: res.form_id
                };
                this.api
                    .post("fee/reprint", formData)
                    .subscribe((res1: any) => {
                        this.router.navigate(["fee", "form", res1.token]);
                    });
            },
            (error: any) => {
                if (error.status == 400) {
                    this.errors = error.error;
                }
                this.spinner.form = false;
            },
            () => {
                this.spinner.form = false;
            }
        );
    }

    change_semester_table() {
        let start = 0,
            end = 8;
        if (this.data.basic.year) {
            end = (this.data.basic.year - 1) * 2;
        }
        if (this.data.basic.mode_of_admission_category == "Lateral_entry") {
            start = 2;
        } else {
            start = 0;
        }
        this.data.semesters = [];
        for (let i = start + 1; i < end + 1; i++) {
            this.data.semesters.push({
                semester: i,
                marks: null,
                total_marks: null
            });
        }
        this.is_semester = this.data.semesters.length > 0;
    }
}
