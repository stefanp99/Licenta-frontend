import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatSort, Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { map, startWith } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Delivery } from './delivery';
import { Contract } from '../contracts/contract';
import { MatPaginator } from '@angular/material/paginator';
import { Plant } from '../plants/plant';
import { HttpHeadersService } from '../http-headers-service';
import { TranslationService } from '../language-changer/translation-service';
import { DeviationsComponent } from '../deviations/deviations.component';
import { SupplierTooltip } from '../suppliers/supplierTooltip';
import { Supplier } from '../suppliers/supplier';

export interface Deviation {
  id: number;
  type: string;
  delivery: Delivery;
  quantityDiff: number;
  timeDiff: number;
}

export interface DeliveryData {
  delivery: Delivery;
  deviations: Deviation[];
}

@Component({
  selector: 'app-deliveries',
  templateUrl: './deliveries.component.html',
  styleUrls: ['./deliveries.component.css']
})
export class DeliveriesComponent implements OnInit {
  displayedColumnsDeliveries: string[] = ['supplierId', 'materialCode', 'plantId', 'pricePerUnit', 'addDeliveryDate',
    'dispatchDate', 'deliveryDate', 'expectedDeliveryDate', 'realQuantity', 'expectedQuantity', 'status', 'dispatchDelivery'];
  displayedColumnsPlants: string[] = ['id', 'segment', 'country', 'city'];
  displayedColumnsContracts: string[] = ['supplierId', 'pricePerUnit'];
  private deliveriesByStatusSupplierMaterialPlantsUrl = 'http://localhost:8080/deliveries/deliveries-by-status-supplier-material-plant';
  private addDeliveryUrl = 'http://localhost:8080/deliveries/add-delivery';
  private plantsUrl = 'http://localhost:8080/plants/plants-by-city-country-segment';
  private contractsUrl = 'http://localhost:8080/contracts/get-by-plantId-supplierId-materialCode';
  private dispatchUrl = 'http://localhost:8080/deliveries/dispatch-delivery';
  private deliverUrl = 'http://localhost:8080/deliveries/deliver-delivery';
  private tooltipsUrl = 'http://localhost:8080/suppliers/tooltips';
  private suppliersUrl = 'http://localhost:8080/suppliers/get-suppliers-by-city-country';
  private getMaterialsUrl = 'http://localhost:8080/contracts/allMaterialCodes';
  orders: Delivery[];
  plants: Plant[];
  materials: string[];
  suppliers: Supplier[];
  contracts: Contract[];
  dataSourceDeliveries = new MatTableDataSource([]);
  dataSourcePlants = new MatTableDataSource([]);
  dataSourceContracts = new MatTableDataSource([]);
  clickedPlant: Plant;
  clickedContract: Contract;
  clickedDelivery: Delivery;
  supplierTooltips: SupplierTooltip[];
  getDeliveriesFormGroup: FormGroup;
  optionsSuppliers: string[] = [];
  optionsPlants: string[] = [];
  optionsMaterials: string[] = [];
  myControlSuppliers = new FormControl('');
  myControlPlants = new FormControl('');
  myControlMaterials = new FormControl('');
  filteredOptionsSuppliers: Observable<string[]>;
  filteredOptionsPlants: Observable<string[]>;
  filteredOptionsMaterials: Observable<string[]>;

  firstFormGroup: FormGroup;
  realQuantityFormGroup: FormGroup;

  @ViewChild('dialogAddDeliveryTemplate') dialogAddDeliveryTemplate: any;
  @ViewChild('dialogDispatchDelivery') dialogDispatchDelivery: any;
  @ViewChild('dialogDeliverDelivery') dialogDeliverDelivery: any;
  @ViewChild('dialogDeviationCreated') dialogDeviationCreated: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dialog: MatDialog, private http: HttpClient, private router: Router,
    private _liveAnnouncer: LiveAnnouncer, private fb: FormBuilder, private _snackBar: MatSnackBar,
    private httpHeadersService: HttpHeadersService, public translationService: TranslationService,
    private deviationsComponent: DeviationsComponent) {
  }

  ngAfterViewInit() {
    this.dataSourceDeliveries.paginator = this.paginator;
  }


  ngOnInit(): void {
    this.getDeliveriesFormGroup = new FormGroup({
      status: new FormControl('undispatched', []),
      plantId: new FormControl('', []),
      supplierId: new FormControl('', []),
      materialCode: new FormControl('', [])
    });
    this.getDeliveries('undispatched');
    this.getPlants();
    this.getSuppliers();
    this.getMaterials();
    this.getAllSupplierToolTips();
    this.firstFormGroup = new FormGroup({
      expectedQuantity: new FormControl(null, []),
      expectedDeliveryDate: new FormControl('', []),
      materialCode: new FormControl('', [])
    });
    this.realQuantityFormGroup = new FormGroup({
      realQuantity: new FormControl(null, [])
    });
    this.dataSourceDeliveries.sortingDataAccessor = (delivery, property) => {
      switch (property) {
        case 'supplierId':
          return delivery.contract.supplier.id;
        case 'materialCode':
          return delivery.contract.materialCode;
        case 'pricePerUnit':
          return delivery.contract.pricePerUnit;
        case 'plantId':
          return delivery.contract.pricePerUnit;
        default:
          return delivery[property];
      }
    };
  }

  getPlants() {
    const httpParams: HttpParams = new HttpParams();
    const options = { params: httpParams, headers: this.httpHeadersService.getHttpHeaders() };
    this.http.get<Plant[]>(this.plantsUrl, options).subscribe(
      response => {
        this.plants = response;
        this.dataSourcePlants.data = this.plants;
        this.dataSourcePlants.sort = this.sort;
        this.plants.forEach(plant => {
          this.optionsPlants.push(plant.id);
        });
        this.filteredOptionsPlants = this.myControlPlants.valueChanges.pipe(
          startWith(''),
          map(value => this._filterPlants(value || '')),
        );
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
        // this.dataSourcePlants.data = this.plants;
        // this.dataSourcePlants.sort = this.sort;
      },
      error => {
        console.error(error);
      }
    );
  }

  getMaterials() {
    const httpParams: HttpParams = new HttpParams();
    const options = { params: httpParams, headers: this.httpHeadersService.getHttpHeaders() };
    this.http.get<string[]>(this.getMaterialsUrl, options).subscribe(
      response => {
        this.materials = response;
        this.materials.forEach(material => {
          this.optionsMaterials.push(material);
        });
        this.filteredOptionsMaterials = this.myControlMaterials.valueChanges.pipe(
          startWith(''),
          map(value => this._filterMaterials(value || '')),
        );
      },
      error => {
        console.error(error);
      }
    );
  }

  getContracts(materialCode: string, plantId: string) {
    const httpParams: HttpParams = new HttpParams().set('materialCode', materialCode).set('plantId', plantId);
    const options = { params: httpParams, headers: this.httpHeadersService.getHttpHeaders() };
    this.http.get<Contract[]>(this.contractsUrl, options).subscribe(
      response => {
        this.contracts = response;
        this.dataSourceContracts.data = this.contracts;
        this.dataSourceContracts.sort = this.sort;
      },
      error => {
        console.error(error);
      }
    );
  }

  getDeliveries(selectedStatus?: string) {
    if (selectedStatus)
      var httpParams = new HttpParams().set('status', selectedStatus);
    else
      var httpParams = new HttpParams()
        .set('status', this.getDeliveriesFormGroup.value.status)
        .set('plantId', this.getDeliveriesFormGroup.value.plantId)
        .set('supplierId', this.getDeliveriesFormGroup.value.supplierId)
        .set('materialCode', this.getDeliveriesFormGroup.value.materialCode);

    const options = { params: httpParams, headers: this.httpHeadersService.getHttpHeaders() };
    this.http.get<Delivery[]>(this.deliveriesByStatusSupplierMaterialPlantsUrl, options).subscribe(
      response => {
        this.orders = response;
        this.dataSourceDeliveries.data = this.orders;
        this.dataSourceDeliveries.sort = this.sort;
      },
      error => {
        console.error(error);
      }
    );
  }

  searchDeliveries() {
    this.getDeliveriesFormGroup.value.plantId = this.myControlPlants.value;
    this.getDeliveriesFormGroup.value.supplierId = this.myControlSuppliers.value;
    this.getDeliveries();
  }

  clearForms() {
    this.getDeliveriesFormGroup.reset();
    this.myControlPlants.reset();
    this.myControlSuppliers.reset();
  }

  dispatchDelivery(delivery: Delivery) {
    const httpParams: HttpParams = new HttpParams().set('id', delivery.id);
    const options = { params: httpParams, headers: this.httpHeadersService.getHttpHeaders() };
    this.http.put<Delivery>(this.dispatchUrl, null, options).subscribe(
      response => {
        this.getDeliveries('undispatched');
        this.clickedDelivery = null;
      },
      error => {
        console.error(error);
      }
    );
    this.openSnackBar(this.translationService.getTranslation('deliveryDispatched'), this.translationService.getTranslation('close'), 5000);
  }

  openDialogDispatchDelivery() {
    const dialogRef = this.dialog.open(this.dialogDispatchDelivery, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  deliverDelivery(delivery: Delivery) {
    if (this.realQuantityFormGroup.valid) {
      const httpParams: HttpParams = new HttpParams()
        .set('id', delivery.id)
        .set('realQuantity', this.realQuantityFormGroup.value.realQuantity);
      const options = { params: httpParams, headers: this.httpHeadersService.getHttpHeaders() };
      this.http.put<DeliveryData>(this.deliverUrl, null, options).subscribe(
        response => {
          this.getDeliveries('dispatched');
          this.clickedDelivery = null;
          if (response.deviations.length > 0) {
            this.openDialogDeviationCreated();
            this.deviationsComponent.ngOnInit();//TODO: refresh table from deviations
          }
        },
        error => {
          console.error(error);
        }
      );
      this.openSnackBar(this.translationService.getTranslation('deliveryDelivered'), this.translationService.getTranslation('close'), 5000);
    }
  }

  openDialogDeliverDelivery() {
    const dialogRef = this.dialog.open(this.dialogDeliverDelivery, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openDialogDeviationCreated() {
    const dialogRef = this.dialog.open(this.dialogDeviationCreated, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openDialogAddDelivery() {
    this.getPlants();
    const dialogRef = this.dialog.open(this.dialogAddDeliveryTemplate, {
      width: '100%',
      data: this.firstFormGroup
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  submitForm() {
    if (this.firstFormGroup.valid) {
      const firstFormValue = this.firstFormGroup.value;
      const httpParams: HttpParams = new HttpParams()
        .set('expectedQuantity', firstFormValue.expectedQuantity)
        .set('expectedDeliveryDate', firstFormValue.expectedDeliveryDate)
        .set('contractId', this.clickedContract.id);
      const options = { params: httpParams, headers: this.httpHeadersService.getHttpHeaders() };
      this.http.post(this.addDeliveryUrl, null, options).subscribe(
        (response) => {
          this.dialog.closeAll();
          this.firstFormGroup.reset();
          this.clickedPlant = null;
          this.clickedContract = null;
          this.getDeliveries('undispatched');
        },
        (error) => {
          console.error('Add failed!', error);
        }
      );
    }
  }

  getCurrentDateTime(): string {
    // Use toISOString() to get date-time in ISO format (YYYY-MM-DDTHH:mm:ss.sssZ)
    return new Date().toISOString().slice(0, 16);
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

  private _filterPlants(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.optionsPlants.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filterSuppliers(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.optionsSuppliers.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filterMaterials(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.optionsMaterials.filter(option => option.toLowerCase().includes(filterValue));
  }

  applyFilterDeliveries(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceDeliveries.filter = filterValue.trim().toLowerCase();
    this.dataSourceDeliveries.filterPredicate = (data, filter: string) => {
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
