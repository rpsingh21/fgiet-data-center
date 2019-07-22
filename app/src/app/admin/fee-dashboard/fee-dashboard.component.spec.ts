import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeDashboardComponent } from './fee-dashboard.component';

describe('FeeDashboardComponent', () => {
  let component: FeeDashboardComponent;
  let fixture: ComponentFixture<FeeDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeeDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
