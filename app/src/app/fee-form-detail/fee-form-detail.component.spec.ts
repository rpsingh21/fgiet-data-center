import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeFormDetailComponent } from './fee-form-detail.component';

describe('FeeFormDetailComponent', () => {
  let component: FeeFormDetailComponent;
  let fixture: ComponentFixture<FeeFormDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeeFormDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeeFormDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
