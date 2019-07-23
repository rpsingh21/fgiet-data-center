import { Component, OnInit } from "@angular/core";

import { ApiService } from "../api.service";
import { Router } from "@angular/router";

@Component({
    selector: "app-fee-registration",
    templateUrl: "./fee-registration.component.html",
    styleUrls: ["./fee-registration.component.scss"]
})
export class FeeRegistrationComponent implements OnInit {
    objectKeys = Object.keys;
    data = {
        fee: {
            year: null,
            amount: null,
            branch: null,
            fee_type: null,
            total_fee: null,
            challan_no: null,
            transfer_id: null,
            transfer_date: null,
            mode_of_payment: null
        },
        basic: {
            dob: null,
            name: null,
            year: null,
            email: null,
            image: "https://fgiet.s3.amazonaws.com/media/passport.jpg",
            branch: null,
            gender: null,
            address: null,
            roll_no: null,
            category: null,
            sub_category: null,
            addhar_no: null,
            mobile_no: null,
            father_name: null,
            mother_name: null,
            father_mobile_no: null,
            mother_mobile_no: null,
            mode_of_admission: null,
            mode_of_admission_category: null
        },
        academics: [
            {
                text: "HighSchool",
                board: null,
                marks: null,
                academic_type: "HighSchool"
            },
            {
                text: "Intermediate",
                board: null,
                marks: null,
                academic_type: "Intermediate"
            },
            {
                text: "Ug or Diploma",
                board: null,
                marks: null,
                academic_type: "UgOrDiploma"
            }
        ],
        semesters: [
            {
                marks: null,
                semester: null,
                total_marks: null
            }
        ]
    };

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
            this.api.post("student/upload", formData).subscribe((res: any) => {
                this.data.basic.image = res.upload;
            });
        }
    }

    onSumitForm() {
        this.api.post("fee/", this.data).subscribe(
            (res: any) => {
                this.router.navigate(["fee", "details", res.id]);
            },
            (error: any) => {
                console.log(error);
            },
            () => {}
        );
    }
}
