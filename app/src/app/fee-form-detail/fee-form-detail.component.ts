import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

import { ApiService } from '../api.service'

@Component({
  selector: 'app-fee-form-detail',
  templateUrl: './fee-form-detail.component.html',
  styleUrls: ['./fee-form-detail.component.scss']
})
export class FeeFormDetailComponent implements OnInit {

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
  form_id: String;

  constructor(private api: ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.form_id = this.route.snapshot.paramMap.get('id');
    this.api.get(`fee/details/${this.form_id}`).subscribe((res:any)=>{
      this.data = res.details;
      this.form_id = res.id;
    })
  }

}
