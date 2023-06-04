import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpHeadersService } from '../http-headers-service';
import { TranslationService } from '../language-changer/translation-service';
import { ReportChoice } from './report-choice';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { formatDate, registerLocaleData } from '@angular/common';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, NativeDateAdapter } from '@angular/material/core';
import localeRo from '@angular/common/locales/ro';


registerLocaleData(localeRo, 'ro');


export const PICK_FORMATS = {
  parse: { dateInput: { month: 'short', year: 'numeric', day: 'numeric' } },
  display: {
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'short' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' }
  }
};


@Injectable()
class PickDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      return formatDate(date, 'yyyy-MM-dd', 'ro');
    } else {
      return date.toDateString();
    }
  }

  getFirstDayOfWeek(): number {
    return 1;
  }
}

@Component({
  selector: 'app-email-report-generate',
  templateUrl: './email-report-generate.component.html',
  styleUrls: ['./email-report-generate.component.css'],
  providers: [
    { provide: DateAdapter, useClass: PickDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'ro' } // Set the Romanian locale
  ]
})
export class EmailReportGenerateComponent implements OnInit {

  myFilter = (d: Date | null): boolean => {
    const date = d || new Date();
    const today = new Date();
    today.setDate(today.getDate() - 1);

    return date <= today;
  };


  private getReportChoicesUrl = 'http://localhost:8080/reportChoices/byUser';
  private updateChoicesUrl = 'http://localhost:8080/reportChoices/updateChoice';
  private generateEmailReportUrl = 'http://localhost:8080/reports/daily';

  reportChoice: ReportChoice;
  reportChoiceFormGroup: FormGroup;
  generateEmailFormGroup: FormGroup;

  constructor(private http: HttpClient, private httpHeadersService: HttpHeadersService,
    public translationService: TranslationService, @Inject(MAT_DIALOG_DATA) public data: { userId: number },
    private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.reportChoiceFormGroup = new FormGroup({
      plantId: new FormControl('', []),
      supplierId: new FormControl('', []),
      materialCode: new FormControl('', [])
    });
    this.generateEmailFormGroup = new FormGroup({
      date: new FormControl('', [])
    })
    this.getReportChoice();
  }

  getReportChoice() {
    const httpParams: HttpParams = new HttpParams()
      .set('userId', this.data.userId);
    const options = { params: httpParams, headers: this.httpHeadersService.getHttpHeaders() };
    this.http.get<ReportChoice>(this.getReportChoicesUrl, options).subscribe(
      response => {
        this.reportChoice = response[0];
      },
      error => {
        console.error(error);
      }
    );
  }

  generateMail() {
    let date = this.generateEmailFormGroup.value.date;
    let httpParams = new HttpParams().set('userId', this.data.userId);
    console.log(date)

    if (date !== null && date !== undefined && date !== '') {
      date.setDate(date.getDate() + 1);
      date = date.toISOString().split('T')[0];
      httpParams = httpParams.set('date', date);
      console.log(httpParams)
    }
    const options = { params: httpParams, headers: this.httpHeadersService.getHttpHeaders() };
    this.http.post<any>(this.generateEmailReportUrl, null, options).subscribe(
      response => {
        this.openSnackBar(this.translationService.getTranslation('emailSent'), this.translationService.getTranslation('close'), 5000);
      },
      error => {
        console.error(error);
      }
    );
  }

  modifyChoices() {
    const httpParams: HttpParams = new HttpParams()
      .set('userId', this.data.userId)
      .set('plantId', this.reportChoiceFormGroup.value.plantId)
      .set('supplierId', this.reportChoiceFormGroup.value.supplierId)
      .set('materialCode', this.reportChoiceFormGroup.value.materialCode);
    const options = { params: httpParams, headers: this.httpHeadersService.getHttpHeaders() };
    this.http.put<any>(this.updateChoicesUrl, null, options).subscribe(
      response => {
        this.openSnackBar(this.translationService.getTranslation('modifiedReportChoices'), this.translationService.getTranslation('close'), 5000);
      },
      error => {
        console.error(error);
      }
    );

  }

  openSnackBar(message: string, action: string, duration: number) {
    this._snackBar.open(message, action, {
      duration: duration
    });
  }

}
