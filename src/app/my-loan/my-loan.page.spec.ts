import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyLoanPage } from './my-loan.page';

describe('MyLoanPage', () => {
  let component: MyLoanPage;
  let fixture: ComponentFixture<MyLoanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyLoanPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyLoanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
