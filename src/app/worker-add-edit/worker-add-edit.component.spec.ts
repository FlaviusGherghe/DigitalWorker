import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerAddEditComponent } from './worker-add-edit.component';

describe('WorkerAddEditComponent', () => {
  let component: WorkerAddEditComponent;
  let fixture: ComponentFixture<WorkerAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkerAddEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkerAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
