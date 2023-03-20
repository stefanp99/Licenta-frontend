import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { FormControl, FormGroup } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { Tolerance } from './tolerance';

@Component({
  selector: 'app-tolerances',
  templateUrl: './tolerances.component.html',
  styleUrls: ['./tolerances.component.css']
})
export class TolerancesComponent implements OnInit {
  private getTolerancesUrl = 'http://localhost:8080/tolerances/get-by-plantId-supplierId-materialCode';
  allTolerances: Tolerance[];
  dataSourceTolerances = new MatTableDataSource([]);
  getTolerancesFormGroup: FormGroup;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private dialog: MatDialog, private http: HttpClient, private router: Router,
    private _liveAnnouncer: LiveAnnouncer) {
  }

  ngOnInit(): void {
    this.getTolerancesFormGroup = new FormGroup({
      plantId: new FormControl('', []),
      supplierId: new FormControl('', []),
      materialCode: new FormControl('', [])
    });
    this.getTolerances();
  }

  getTolerances() {
    const httpParams: HttpParams = new HttpParams()
      .set('plantId', this.getTolerancesFormGroup.value.plantId)
      .set('supplierId', this.getTolerancesFormGroup.value.supplierId)
      .set('materialCode', this.getTolerancesFormGroup.value.materialCode);
    const options = { params: httpParams, headers: environment.headers };
    this.http.get<Tolerance[]>(this.getTolerancesUrl, options).subscribe(
      response => {
        this.allTolerances = response;
        this.dataSourceTolerances.data = this.allTolerances;
        this.dataSourceTolerances.sort = this.sort;
      },
      error => {
        console.error(error);
      }
    );
  }

}
