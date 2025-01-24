import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CasesEditPage } from './cases-edit.page';

describe('CasesEditPage', () => {
  let component: CasesEditPage;
  let fixture: ComponentFixture<CasesEditPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CasesEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
