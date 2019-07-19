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
        basic: {
            image: 'https://image.shutterstock.com/image-vector/avatar-profile-picture-icon-set-260nw-629394953.jpg',
        },
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
            this.optionsData = res;
        })
    }

    onUpload(event){
        if (event.target.files.length > 0) {
            const formData = new FormData();
            const file = event.target.files[0];
            formData.append('upload', file);
            this.api.post('student/upload', formData).subscribe((res:any)=>{
                this.data.basic.image = res.upload;
            })
        }
    }

    onSumitForm() {
        console.log(this.data);
    }

}
