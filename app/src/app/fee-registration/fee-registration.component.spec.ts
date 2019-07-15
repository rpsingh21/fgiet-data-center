import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeRegistrationComponent } from './fee-registration.component';

describe('FeeRegistrationComponent', () => {
  let component: FeeRegistrationComponent;
  let fixture: ComponentFixture<FeeRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeeRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeeRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
