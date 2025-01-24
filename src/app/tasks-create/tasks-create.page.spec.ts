import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TasksCreatePage } from './tasks-create.page';

describe('TasksCreatePage', () => {
  let component: TasksCreatePage;
  let fixture: ComponentFixture<TasksCreatePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
