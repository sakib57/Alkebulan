import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMembersPage } from './view-members.page';

describe('ViewMembersPage', () => {
  let component: ViewMembersPage;
  let fixture: ComponentFixture<ViewMembersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMembersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMembersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
