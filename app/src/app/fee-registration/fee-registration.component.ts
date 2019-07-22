import { Component, OnInit } from '@angular/core';

import { ApiService } from '../api.service'
import { Router } from '@angular/router'

@Component({
    selector: 'app-fee-registration',
    templateUrl: './fee-registration.component.html',
    styleUrls: ['./fee-registration.component.scss']
})
export class FeeRegistrationComponent implements OnInit {
    objectKeys = Object.keys;
    data = {
        basic: {
            image: 'https://fgiet.s3.amazonaws.com/media/passport.jpg',
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

    constructor(private api: ApiService, private router: Router) {}

    ngOnInit() {
        for (let i = 1; i < 9; i++) {
            this.data.semesters.push({
                semester: i,
            });
        }
        this.api.get('fee/details/11').subscribe((res:any)=>{
            this.data = res.details;
        })
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
        this.api.post('fee/', this.data).subscribe((res: any)=>{
            this.router.navigate(['fee', 'details', res.id]);
        }, (error: any)=>{
            console.log(error);
        }, ( )=> {

        })
    }

}
