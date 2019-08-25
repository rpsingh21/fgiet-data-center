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
    optionsData;

    constructor(
        private api: ApiService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get("id");
        const token = this.route.snapshot.paramMap.get("token");
        this.api.get("fee/form-details").subscribe(
            (res: any) => {
                this.optionsData = res;
                if (id) {
                    this.api.getx(`fee/details/${id}`).subscribe(
                        (res: any) => {
                            this.setData(res);
                        },
                        error => {
                            this.router.navigate(["/", "admin", "login"]);
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
            },
            error => {
                this.reDirectHome();
            }
        );
    }

    reDirectHome() {
        this.router.navigate(["/"]);
    }

    setData(res) {
        this.data = res.details;
        this.form_id = res.form_id;
        this.is_semester = this.data.semesters.length > 0;
    }

    onPrint() {
        window.print();
    }
}
