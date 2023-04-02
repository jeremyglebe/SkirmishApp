import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WarbandEditorPage } from './warband-editor.page';

describe('WarbandEditorPage', () => {
  let component: WarbandEditorPage;
  let fixture: ComponentFixture<WarbandEditorPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(WarbandEditorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
