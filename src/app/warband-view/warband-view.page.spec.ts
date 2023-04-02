import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WarbandViewPage } from './warband-view.page';

describe('WarbandViewPage', () => {
  let component: WarbandViewPage;
  let fixture: ComponentFixture<WarbandViewPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(WarbandViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
