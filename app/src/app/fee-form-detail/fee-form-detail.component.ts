import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { ApiService } from "../api.service";

@Component({
    selector: "app-fee-form-detail",
    templateUrl: "./fee-form-detail.component.html",
    styleUrls: ["./fee-form-detail.component.scss"]
})
export class FeeFormDetailComponent implements OnInit {
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
    form_id: String;

    constructor(private api: ApiService, private route: ActivatedRoute) {}

    ngOnInit() {
        this.form_id = this.route.snapshot.paramMap.get("id");
        this.api.get(`fee/details/${this.form_id}`).subscribe((res: any) => {
            this.data = res.details;
            this.form_id = res.id;
        });
    }
}
