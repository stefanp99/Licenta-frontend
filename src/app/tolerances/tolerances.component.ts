import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { Tolerance } from './tolerance';
import { Plant } from '../plants/plant';
import { Supplier } from '../suppliers/supplier';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpHeadersService } from '../http-headers-service';
import { TranslationService } from '../language-changer/translation-service';
import { SupplierTooltip } from '../suppliers/supplierTooltip';


@Component({
  selector: 'app-tolerances',
  templateUrl: './tolerances.component.html',
  styleUrls: ['./tolerances.component.css']
})
export class TolerancesComponent implements OnInit {
  private getTolerancesUrl = 'http://localhost:8080/tolerances/get-by-plantId-supplierId-materialCode';
  private addToleranceUrl = 'http://localhost:8080/tolerances/add'
  private updateToleranceUrl = 'http://localhost:8080/tolerances/update'
  private deleteToleranceUrl = 'http://localhost:8080/tolerances/delete'
  private plantsUrl = 'http://localhost:8080/plants/plants-by-city-country-segment';
  private suppliersUrl = 'http://localhost:8080/suppliers/get-suppliers-by-city-country';
  private tooltipsUrl = 'http://localhost:8080/suppliers/tooltips';
  allTolerances: Tolerance[];
  plants: Plant[];
  suppliers: Supplier[];
  myControlSuppliers = new FormControl('');
  optionsSuppliers: string[] = [];
  myControlSuppliersAdd = new FormControl('');
  filteredOptionsSuppliers: Observable<string[]>;
  filteredOptionsSuppliersAdd: Observable<string[]>;
  myControlPlants = new FormControl('');
  optionsPlants: string[] = [];
  myControlPlantsAdd = new FormControl('');
  filteredOptionsPlants: Observable<string[]>;
  filteredOptionsPlantsAdd: Observable<string[]>;
  dataSourceTolerances = new MatTableDataSource([]);
  getTolerancesFormGroup: FormGroup;
  addTolerancesFormGroup: FormGroup;
  displayedColumnsTolerances: string[] = ['supplierId', 'supplierName', 'materialCode', 'plantId', 'qtyUpperLimit', 'qtyLowerLimit', 'dayUpperLimit', 'dayLowerLimit', 'edit', 'save', 'delete'];
  clickedTolerance: Tolerance;
  supplierTooltips: SupplierTooltip[];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('dialogAddTolerance') dialogAddTolerance: any;
  @ViewChild('dialogDeleteTolerance') dialogDeleteTolerance: any;

  constructor(private dialog: MatDialog, private http: HttpClient, private router: Router,
    private _liveAnnouncer: LiveAnnouncer, private _snackBar: MatSnackBar, private httpHeadersService: HttpHeadersService, public translationService: TranslationService) {
  }

  ngAfterViewInit() {
    this.dataSourceTolerances.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getAllSupplierToolTips();
    this.getTolerancesFormGroup = new FormGroup({
      plantId: new FormControl('', []),
      supplierId: new FormControl('', []),
      materialCode: new FormControl('', [])
    });
    this.addTolerancesFormGroup = new FormGroup({
      plantId: new FormControl('', []),
      supplierId: new FormControl('', []),
      materialCode: new FormControl('', []),
      qtyUpperLimit: new FormControl(0, []),
      qtyLowerLimit: new FormControl(0, []),
      dayUpperLimit: new FormControl(0, []),
      dayLowerLimit: new FormControl(0, [])
    });
    this.getTolerances();
    this.getPlants();
    this.getSuppliers();

    this.dataSourceTolerances.sortingDataAccessor = (tolerance, property) => {
      switch (property) {
        case 'supplierId':
          return tolerance.supplier.id;
        case 'supplierName':
          return tolerance.supplier.name;
        default:
          return tolerance[property];
      }
    };
  }

  changeEditMode(element: Tolerance) {
    element.editMode = !element.editMode;
  }

  getTolerances() {
    const httpParams: HttpParams = new HttpParams()
      .set('plantId', this.getTolerancesFormGroup.value.plantId)
      .set('supplierId', this.getTolerancesFormGroup.value.supplierId)
      .set('materialCode', this.getTolerancesFormGroup.value.materialCode);
    const options = { params: httpParams, headers: this.httpHeadersService.getHttpHeaders() };
    this.http.get<Tolerance[]>(this.getTolerancesUrl, options).subscribe(
      response => {
        this.allTolerances = response;
        this.dataSourceTolerances.data = this.allTolerances;
        this.dataSourceTolerances.sort = this.sort;
        this.allTolerances.forEach(tolerance => {
          if (tolerance.materialCode === '%')
            tolerance.materialCode = 'all';
          if (tolerance.plantId === '%')
            tolerance.plantId = 'all';
        });
      },
      error => {
        console.error(error);
      }
    );
  }

  getPlants() {
    const httpParams: HttpParams = new HttpParams();
    const options = { params: httpParams, headers: this.httpHeadersService.getHttpHeaders() };
    this.http.get<Plant[]>(this.plantsUrl, options).subscribe(
      response => {
        this.plants = response;
        this.optionsPlants.push('All');
        this.plants.forEach(plant => {
          this.optionsPlants.push(plant.id);
        });

        this.filteredOptionsPlants = this.myControlPlants.valueChanges.pipe(
          startWith(''),
          map(value => this._filterPlants(value || '')),
        );
        this.filteredOptionsPlantsAdd = this.myControlPlantsAdd.valueChanges.pipe(
          startWith(''),
          map(value => this._filterPlants(value || '')),
        );
        // this.dataSourcePlants.data = this.plants;
        // this.dataSourcePlants.sort = this.sort;
      },
      error => {
        console.error(error);
      }
    );
  }

  getSuppliers() {
    const httpParams: HttpParams = new HttpParams();
    const options = { params: httpParams, headers: this.httpHeadersService.getHttpHeaders() };
    this.http.get<Supplier[]>(this.suppliersUrl, options).subscribe(
      response => {
        this.suppliers = response;
        this.suppliers.forEach(supplier => {
          this.optionsSuppliers.push(supplier.id);
        });
        this.filteredOptionsSuppliers = this.myControlSuppliers.valueChanges.pipe(
          startWith(''),
          map(value => this._filterSuppliers(value || '')),
        );
        this.filteredOptionsSuppliersAdd = this.myControlSuppliersAdd.valueChanges.pipe(
          startWith(''),
          map(value => this._filterSuppliers(value || '')),
        );
        // this.dataSourcePlants.data = this.plants;
        // this.dataSourcePlants.sort = this.sort;
      },
      error => {
        console.error(error);
      }
    );
  }

  searchTolerances() {
    this.getTolerancesFormGroup.value.plantId = this.myControlPlants.value;
    this.getTolerancesFormGroup.value.supplierId = this.myControlSuppliers.value;
    this.getTolerances();
  }

  addTolerance() {
    this.addTolerancesFormGroup.value.supplierId = this.myControlSuppliersAdd.value;
    this.addTolerancesFormGroup.value.plantId = this.myControlPlantsAdd.value;
    if (this.myControlPlantsAdd.value === 'All' || this.myControlPlantsAdd.value === '' || this.myControlPlantsAdd.value === null)
      this.addTolerancesFormGroup.value.plantId = '%';
    else
      this.addTolerancesFormGroup.value.plantId = this.myControlPlantsAdd.value;
    if (this.addTolerancesFormGroup.value.materialCode === 'All' || this.addTolerancesFormGroup.value.materialCode === '' ||
      this.addTolerancesFormGroup.value.materialCode === null ||
      this.addTolerancesFormGroup.value.materialCode === '*')
      this.addTolerancesFormGroup.value.materialCode = '%';
    if (this.addTolerancesFormGroup.value.qtyUpperLimit === null)
      this.addTolerancesFormGroup.value.qtyUpperLimit = 0;
    if (this.addTolerancesFormGroup.value.qtyLowerLimit === null)
      this.addTolerancesFormGroup.value.qtyLowerLimit = 0;
    if (this.addTolerancesFormGroup.value.dayUpperLimit === null)
      this.addTolerancesFormGroup.value.dayUpperLimit = 0;
    if (this.addTolerancesFormGroup.value.dayLowerLimit === null)
      this.addTolerancesFormGroup.value.dayLowerLimit = 0;

    const httpParams: HttpParams = new HttpParams()
      .set('plantId', this.addTolerancesFormGroup.value.plantId)
      .set('supplierId', this.addTolerancesFormGroup.value.supplierId)
      .set('materialCode', this.addTolerancesFormGroup.value.materialCode)
      .set('qtyUpperLimit', this.addTolerancesFormGroup.value.qtyUpperLimit)
      .set('qtyLowerLimit', this.addTolerancesFormGroup.value.qtyLowerLimit)
      .set('dayUpperLimit', this.addTolerancesFormGroup.value.dayUpperLimit)
      .set('dayLowerLimit', this.addTolerancesFormGroup.value.dayLowerLimit);

    const options = { params: httpParams, headers: this.httpHeadersService.getHttpHeaders() };
    this.http.post<Tolerance>(this.addToleranceUrl, null, options).subscribe(
      response => {
        this.searchTolerances();
        this.openSnackBar(this.translationService.getTranslation('toleranceAdded'), this.translationService.getTranslation('close'), 5000);
        this.clearForms();
      },
      error => {
        console.error(error);
      }
    );
  }

  openDialogAddTolerance() {
    const dialogRef = this.dialog.open(this.dialogAddTolerance, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  clearForms() {
    this.getTolerancesFormGroup.reset();
    this.addTolerancesFormGroup.reset();
    this.myControlPlants.reset();
    this.myControlSuppliers.reset();
  }

  updateTolerance(tolerance: Tolerance, i: number) {

    const httpParams: HttpParams = new HttpParams()
      .set('id', tolerance.id)
      .set('plantId', tolerance.plantId)
      .set('supplierId', tolerance.supplier.id)
      .set('materialCode', tolerance.materialCode)
      .set('qtyUpperLimit', tolerance.qtyUpperLimit)
      .set('qtyLowerLimit', tolerance.qtyLowerLimit)
      .set('dayUpperLimit', tolerance.dayUpperLimit)
      .set('dayLowerLimit', tolerance.dayLowerLimit);

    const options = { params: httpParams, headers: this.httpHeadersService.getHttpHeaders() };
    this.http.put<Tolerance>(this.updateToleranceUrl, null, options).subscribe(
      response => {
        this.searchTolerances();
        this.openSnackBar(this.translationService.getTranslation('toleranceUpdated'), this.translationService.getTranslation('close'), 5000);
      },
      error => {
        console.error(error);
      }
    );
  }

  deleteTolerance(tolerance: Tolerance) {
    const httpParams: HttpParams = new HttpParams()
      .set('id', tolerance.id);

    const options = { params: httpParams, headers: this.httpHeadersService.getHttpHeaders() };
    this.http.delete<Tolerance>(this.deleteToleranceUrl, options).subscribe(
      response => {
        this.searchTolerances();
        this.openSnackBar(this.translationService.getTranslation('toleranceDeleted'), this.translationService.getTranslation('close'), 5000);
      },
      error => {
        console.error(error);
      }
    );
  }

  openDialogDeleteTolerance(tolerance: Tolerance) {
    this.clickedTolerance = tolerance;
    const dialogRef = this.dialog.open(this.dialogDeleteTolerance, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  getAllSupplierToolTips() {
    const httpParams: HttpParams = new HttpParams();
    const options = { params: httpParams, headers: this.httpHeadersService.getHttpHeaders() };
    this.http.get<SupplierTooltip[]>(this.tooltipsUrl, options).subscribe(
      response => {
        this.supplierTooltips = response;
      },
      error => {
        console.error(error);
      }
    );
  }

  getSupplierToolTip(supplierId: string): string {
    let supplierTooltip = this.supplierTooltips?.find(i => i.id === supplierId);
    if (supplierTooltip) {
      return `${this.translationService.getTranslation('id')}: ${supplierTooltip.id}
      ${this.translationService.getTranslation('name')}: ${supplierTooltip.name}
      ${this.translationService.getTranslation('cityCountry')}: ${supplierTooltip.cityCountry}
      ${this.translationService.getTranslation('totalNumberDeliveries')}: ${supplierTooltip.totalNumberDeliveries}
      ${this.translationService.getTranslation('correctDeliveriesPercentage')}: ${supplierTooltip.correctDeliveriesPercentage.toFixed(2)}
      ${this.translationService.getTranslation('qtyDeviationCurveRating')}: ${supplierTooltip.qtyDeviationCurveRating.toFixed(2)}
      ${this.translationService.getTranslation('dayDeviationCurveRating')}: ${supplierTooltip.dayDeviationCurveRating.toFixed(2)}
      ${this.translationService.getTranslation('averageNumberOfHoursToDeliver')}: ${supplierTooltip.averageNumberOfHoursToDeliver.toFixed(2)}
      ${this.translationService.getTranslation('averageNumberOfHoursLeadTime')}: ${supplierTooltip.averageLeadTimeInHours.toFixed(2)}`;
    }
    else return ``;
  }

  openSnackBar(message: string, action: string, duration: number) {
    this._snackBar.open(message, action, {
      duration: duration
    });
  }

  private _filterPlants(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.optionsPlants.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filterSuppliers(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.optionsSuppliers.filter(option => option.toLowerCase().includes(filterValue));
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  applyFilterTolerances(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceTolerances.filter = filterValue.trim().toLowerCase();
    this.dataSourceTolerances.filterPredicate = (data, filter: string) => {
      const accumulator = (currentTerm, key) => {
        return this.nestedFilterCheck(currentTerm, data, key);
      };
      const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
      // Transform the filter by converting it to lowercase and removing whitespace.
      const transformedFilter = filter.trim().toLowerCase();
      return dataStr.indexOf(transformedFilter) !== -1;
    };
  }

  nestedFilterCheck(search, data, key) {
    if (typeof data[key] === 'object') {
      for (const k in data[key]) {
        if (data[key][k] !== null) {
          search = this.nestedFilterCheck(search, data[key], k);

        }
      }
    } else {
      search += data[key];
    }
    return search;
  }

}
