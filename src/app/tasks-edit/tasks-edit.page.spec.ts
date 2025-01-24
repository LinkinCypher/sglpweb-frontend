import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TasksEditPage } from './tasks-edit.page';

describe('TasksEditPage', () => {
  let component: TasksEditPage;
  let fixture: ComponentFixture<TasksEditPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
