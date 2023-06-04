import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailReportGenerateComponent } from './email-report-generate.component';

describe('EmailReportGenerateComponent', () => {
  let component: EmailReportGenerateComponent;
  let fixture: ComponentFixture<EmailReportGenerateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailReportGenerateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailReportGenerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
