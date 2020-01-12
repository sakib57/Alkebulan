import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LatePaymentsPage } from './late-payments.page';

describe('LatePaymentsPage', () => {
  let component: LatePaymentsPage;
  let fixture: ComponentFixture<LatePaymentsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LatePaymentsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatePaymentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
