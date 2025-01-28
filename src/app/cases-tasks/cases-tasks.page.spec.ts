import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CasesTasksPage } from './cases-tasks.page';

describe('CasesTasksPage', () => {
  let component: CasesTasksPage;
  let fixture: ComponentFixture<CasesTasksPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CasesTasksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
