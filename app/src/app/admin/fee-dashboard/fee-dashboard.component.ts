import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../api.service";

@Component({
    selector: "app-fee-dashboard",
    templateUrl: "./fee-dashboard.component.html",
    styleUrls: ["./fee-dashboard.component.scss"]
})
export class FeeDashboardComponent implements OnInit {
    constructor(private api: ApiService) {}
    data = [];

    ngOnInit() {}

    updateTable() {
        this.api.get("fee/admin/details").subscribe((res: any) => {
            this.data = res.map(item => {
                return {
                    form_id: item.form_id,
                    name: item.basic.name,
                    roll_no: item.roll_no,
                    session: item.session,
                    email: item.basic.email,
                    year: item.fee.year,
                    branch: item.fee.branch,
                    mode_of_payment: item.fee.mode_of_payment,
                    fee_type: item.fee.fee_type,
                    total_fee: item.fee.total_fee,
                    amount: item.fee.amount,
                    transfer_id: item.fee.transfer_id,
                    transfer_date: item.fee.transfer_date,
                    registration_datetime: item.created_at,
                    is_verified: item.is_verified
                };
            });
        });
    }
}
