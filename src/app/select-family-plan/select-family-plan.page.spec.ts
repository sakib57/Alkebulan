import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectFamilyPlanPage } from './select-family-plan.page';

describe('SelectFamilyPlanPage', () => {
  let component: SelectFamilyPlanPage;
  let fixture: ComponentFixture<SelectFamilyPlanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectFamilyPlanPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectFamilyPlanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
