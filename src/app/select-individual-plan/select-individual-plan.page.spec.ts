import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectIndividualPlanPage } from './select-individual-plan.page';

describe('SelectIndividualPlanPage', () => {
  let component: SelectIndividualPlanPage;
  let fixture: ComponentFixture<SelectIndividualPlanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectIndividualPlanPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectIndividualPlanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
