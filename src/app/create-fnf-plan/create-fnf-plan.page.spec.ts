import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFnfPlanPage } from './create-fnf-plan.page';

describe('CreateFnfPlanPage', () => {
  let component: CreateFnfPlanPage;
  let fixture: ComponentFixture<CreateFnfPlanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateFnfPlanPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFnfPlanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
