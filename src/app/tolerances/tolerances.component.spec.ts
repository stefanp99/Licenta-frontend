import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TolerancesComponent } from './tolerances.component';

describe('TolerancesComponent', () => {
  let component: TolerancesComponent;
  let fixture: ComponentFixture<TolerancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TolerancesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TolerancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
