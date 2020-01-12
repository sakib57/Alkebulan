import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedPlanPage } from './created-plan.page';

describe('CreatedPlanPage', () => {
  let component: CreatedPlanPage;
  let fixture: ComponentFixture<CreatedPlanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatedPlanPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatedPlanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
