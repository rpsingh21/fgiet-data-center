import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fee-registration',
  templateUrl: './fee-registration.component.html',
  styleUrls: ['./fee-registration.component.scss']
})
export class FeeRegistrationComponent implements OnInit {

  data = {
    basic:{

    },
    academics: [
      {academic_type: 'HighSchool', text: 'High School'},
      {academic_type: 'Intermediate', text: 'Intermediate'},
      {academic_type: 'UgOrDiploma', text: 'Ug or Diploma'},
    ],
    semesters: [

    ],
    fee: {
      
    }
  }

  constructor() { }

  ngOnInit() {
    for(let i=1; i<9; i++){
      this.data.semesters.push({
        semester:i,
      })
    }
  }

}
