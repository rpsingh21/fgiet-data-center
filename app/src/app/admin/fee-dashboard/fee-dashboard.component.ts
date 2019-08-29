import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { ApiService } from "../../api.service";
import { ExcelService } from "../../excel.service";
import { filter_form } from "../../data";
import { toQueryString } from "../../utils";

@Component({
    selector: "app-fee-dashboard",
    templateUrl: "./fee-dashboard.component.html",
    styleUrls: ["./fee-dashboard.component.scss"]
})
export class FeeDashboardComponent implements OnInit {
    data = [];
    filterData = filter_form;
    optionsData;
    objectKeys = Object.keys;

    constructor(
        private api: ApiService,
        private excel: ExcelService,
        private router: Router
    ) {}

    ngOnInit() {
        this.loadOptionData();
    }

    loadOptionData() {
        this.api.get("fee/form-details").subscribe((res: any) => {
            this.optionsData = res;
            this.updateTable();
        });
    }

    updateTable() {
        const queryString = toQueryString(this.filterData);
        const url = `fee/admin/details${queryString}`;
        this.api.getx(url).subscribe(
            (res: any) => {
                this.data = res.map(item => {
                    return {
                        form_id: item.form_id,
                        name: item.basic.name,
                        roll_no: item.roll_no,
                        session: item.session,
                        email: item.basic.email,
                        year: item.fee.year,
                        branch: this.optionsData.branch[item.fee.branch],
                        mode_of_payment: this.optionsData.mode_of_payment[
                            item.fee.mode_of_payment
                        ],
                        fee_type: this.optionsData.fee_type[item.fee.fee_type],
                        total_fee: item.fee.total_fee,
                        amount: item.fee.amount,
                        transfer_id: item.fee.transfer_id,
                        apply_date: item.created_at,
                        transfer_date: item.fee.transfer_date,
                        registration_datetime: item.created_at,
                        is_verified: this.optionsData.status[item.is_verified]
                    };
                });
            },
            error => {
                this.router.navigate(["/", "admin", "login"]);
            }
        );
    }
    exportAsXLSX(): void {
        this.excel.exportAsExcelFile(this.data, "fgiet");
    }
}
