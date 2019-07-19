import {
    Component,
    OnInit
} from '@angular/core';

import { ApiService } from '../api.service'

@Component({
    selector: 'app-fee-registration',
    templateUrl: './fee-registration.component.html',
    styleUrls: ['./fee-registration.component.scss']
})
export class FeeRegistrationComponent implements OnInit {
    objectKeys = Object.keys;
    data = {
        basic: { },
        academics: [{
                academic_type: 'HighSchool',
                text: 'High School'
            },
            {
                academic_type: 'Intermediate',
                text: 'Intermediate'
            },
            {
                academic_type: 'UgOrDiploma',
                text: 'Ug or Diploma'
            },
        ],
        semesters: [ ],
        fee: { }
    }

    optionsData: any;

    constructor(private api: ApiService) {}

    ngOnInit() {
        for (let i = 1; i < 9; i++) {
            this.data.semesters.push({
                semester: i,
            });
        }
        this.api.get('fee/form-details').subscribe((res:any) => {
            console.log(res);
            this.optionsData = res;
        })
    }

    onSumitForm() {
        console.log(this.data);
    }

}
