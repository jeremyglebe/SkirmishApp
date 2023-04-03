import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitsListPage } from './units-list.page';

describe('HomePage', () => {
  let component: UnitsListPage;
  let fixture: ComponentFixture<UnitsListPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(UnitsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
