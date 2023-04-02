import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WarbandsListPage } from './warbands-list.page';

describe('WarbandsListPage', () => {
  let component: WarbandsListPage;
  let fixture: ComponentFixture<WarbandsListPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(WarbandsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
