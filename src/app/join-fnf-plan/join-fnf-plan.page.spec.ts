import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinFnfPlanPage } from './join-fnf-plan.page';

describe('JoinFnfPlanPage', () => {
  let component: JoinFnfPlanPage;
  let fixture: ComponentFixture<JoinFnfPlanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinFnfPlanPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinFnfPlanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
