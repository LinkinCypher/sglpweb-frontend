import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CasesCreatePage } from './cases-create.page';

describe('CasesCreatePage', () => {
  let component: CasesCreatePage;
  let fixture: ComponentFixture<CasesCreatePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CasesCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
