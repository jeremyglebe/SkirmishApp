import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewUnitPage } from './view-unit.page';

describe('ViewUnitPage', () => {
  let component: ViewUnitPage;
  let fixture: ComponentFixture<ViewUnitPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ViewUnitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
