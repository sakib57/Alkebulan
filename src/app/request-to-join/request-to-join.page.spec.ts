import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestToJoinPage } from './request-to-join.page';

describe('RequestToJoinPage', () => {
  let component: RequestToJoinPage;
  let fixture: ComponentFixture<RequestToJoinPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestToJoinPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestToJoinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
