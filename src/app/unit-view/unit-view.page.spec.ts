import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UnitViewPage } from './unit-view.page';

describe('ViewUnitPage', () => {
  let component: UnitViewPage;
  let fixture: ComponentFixture<UnitViewPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UnitViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
