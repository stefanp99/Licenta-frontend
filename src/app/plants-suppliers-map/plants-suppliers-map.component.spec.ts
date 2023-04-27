import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantsSuppliersMapComponent } from './plants-suppliers-map.component';

describe('PlantsSuppliersMapComponent', () => {
  let component: PlantsSuppliersMapComponent;
  let fixture: ComponentFixture<PlantsSuppliersMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantsSuppliersMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantsSuppliersMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
