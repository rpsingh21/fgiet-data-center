import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { ApiService } from "../api.service";
import { fee_form } from "../data";

@Component({
    selector: "app-fee-form-detail",
    templateUrl: "./fee-form-detail.component.html",
    styleUrls: ["./fee-form-detail.component.scss"]
})
export class FeeFormDetailComponent implements OnInit {
    data = fee_form;
    form_id: String;
    is_semester = true;

    constructor(
        private api: ApiService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get("id");
        const token = this.route.snapshot.paramMap.get("token");
        if (id) {
            this.api.get(`fee/details/${id}`).subscribe(
                (res: any) => {
                    this.setData(res);
                },
                error => {
                    this.reDirectHome();
                }
            );
        } else if (token) {
            this.api.get(`fee/reprint?token=${token}`).subscribe(
                (res: any) => {
                    this.setData(res);
                },
                error => {
                    this.reDirectHome();
                }
            );
        } else {
            this.reDirectHome();
        }
    }

    reDirectHome() {
        this.router.navigate(["/"]);
    }

    setData(res) {
        this.data = res.details;
        this.form_id = res.id;
        this.is_semester = this.data.semesters.length > 0;
    }

    onPrint() {
        window.print();
    }
}
