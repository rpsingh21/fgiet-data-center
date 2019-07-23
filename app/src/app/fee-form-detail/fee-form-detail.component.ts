import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

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

    constructor(private api: ApiService, private route: ActivatedRoute) {}

    ngOnInit() {
        this.form_id = this.route.snapshot.paramMap.get("id");
        this.api.get(`fee/details/${this.form_id}`).subscribe((res: any) => {
            this.data = res.details;
            this.form_id = res.id;
        });
    }
}
