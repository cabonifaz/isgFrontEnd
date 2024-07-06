import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineEventsComponent } from './machine-events.component';

describe('MachineEventsComponent', () => {
  let component: MachineEventsComponent;
  let fixture: ComponentFixture<MachineEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MachineEventsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
