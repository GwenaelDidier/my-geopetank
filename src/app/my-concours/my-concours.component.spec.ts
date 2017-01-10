/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MyConcoursComponent } from './my-concours.component';

describe('MyConcoursComponent', () => {
  let component: MyConcoursComponent;
  let fixture: ComponentFixture<MyConcoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyConcoursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyConcoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
