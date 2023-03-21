import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatSort, Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { environment } from "../../environments/environment";
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Delivery } from './delivery';
import { Contract } from '../contracts/contract';
import { MatPaginator } from '@angular/material/paginator';
import { Plant } from '../plants/plant';

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
  displayedColumnsDeliveries: string[] = ['status', 'dispatchDate', 'deliveryDate', 'supplierId',
    'materialCode', 'pricePerUnit', 'plantId', 'expectedQuantity', 'expectedDeliveryDate', 'dispatchDelivery'];
  displayedColumnsPlants: string[] = ['id', 'segment', 'country', 'city'];
  displayedColumnsContracts: string[] = ['supplierId', 'pricePerUnit'];
  private deliveriesByStatusUrl = 'http://localhost:8080/deliveries/deliveries-by-status';
  private addDeliveryUrl = 'http://localhost:8080/deliveries/add-delivery';
  private plantsUrl = 'http://localhost:8080/plants/plants-by-city-country-segment';
  private contractsUrl = 'http://localhost:8080/contracts/by-materialCode-plantId';
  private dispatchUrl = 'http://localhost:8080/deliveries/dispatch-delivery';
  private deliverUrl = 'http://localhost:8080/deliveries/deliver-delivery';
  orders: Delivery[];
  plants: Plant[];
  contracts: Contract[];
  dataSourceDeliveries = new MatTableDataSource([]);
  dataSourcePlants = new MatTableDataSource([]);
  dataSourceContracts = new MatTableDataSource([]);
  clickedPlant: Plant;
  clickedContract: Contract;
  clickedDelivery: Delivery;

  firstFormGroup: FormGroup;
  realQuantityFormGroup: FormGroup;

  @ViewChild('dialogAddDeliveryTemplate') dialogAddDeliveryTemplate: any;
  @ViewChild('dialogDispatchDelivery') dialogDispatchDelivery: any;
  @ViewChild('dialogDeliverDelivery') dialogDeliverDelivery: any;
  @ViewChild('dialogDeviationCreated') dialogDeviationCreated: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dialog: MatDialog, private http: HttpClient, private router: Router,
    private _liveAnnouncer: LiveAnnouncer, private fb: FormBuilder, private _snackBar: MatSnackBar) {
  }

  ngAfterViewInit() {
    this.dataSourceDeliveries.paginator = this.paginator;
  }


  ngOnInit(): void {
    this.getDeliveriesByStatus('undispatched');
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
          return delivery.contract.supplierId;
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
    const options = { params: httpParams, headers: environment.headers };
    this.http.get<Plant[]>(this.plantsUrl, options).subscribe(
      response => {
        this.plants = response;
        this.dataSourcePlants.data = this.plants;
        this.dataSourcePlants.sort = this.sort;
      },
      error => {
        console.error(error);
      }
    );
  }

  getContracts(materialCode: string, plantId: string) {
    const httpParams: HttpParams = new HttpParams().set('materialCode', materialCode).set('plantId', plantId);
    const options = { params: httpParams, headers: environment.headers };
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

  getDeliveriesByStatus(selectedStatus: string) {
    const httpParams: HttpParams = new HttpParams().set('status', selectedStatus);
    const options = { params: httpParams, headers: environment.headers };
    this.http.get<Delivery[]>(this.deliveriesByStatusUrl, options).subscribe(
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

  dispatchDelivery(delivery: Delivery) {
    const httpParams: HttpParams = new HttpParams().set('id', delivery.id);
    const options = { params: httpParams, headers: environment.headers };
    this.http.put<Delivery>(this.dispatchUrl, null, options).subscribe(
      response => {
        this.getDeliveriesByStatus('undispatched');
        this.clickedDelivery = null;
      },
      error => {
        console.error(error);
      }
    );
    this.openSnackBar('Delivery dispatched!', 'Close', 5000);
  }

  openDialogDispatchDelivery() {
    const dialogRef = this.dialog.open(this.dialogDispatchDelivery, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  deliverDelivery(delivery: Delivery) {
    if (this.realQuantityFormGroup.valid) {
      const httpParams: HttpParams = new HttpParams()
        .set('id', delivery.id)
        .set('realQuantity', this.realQuantityFormGroup.value.realQuantity);
      const options = { params: httpParams, headers: environment.headers };
      this.http.put<DeliveryData>(this.deliverUrl, null, options).subscribe(
        response => {
          this.getDeliveriesByStatus('dispatched');
          this.clickedDelivery = null;
          if (response.deviations != null) {
            this.openDialogDeviationCreated();
          }
        },
        error => {
          console.error(error);
        }
      );
      this.openSnackBar('Delivery delivered!', 'Close', 5000);
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
      width: '500px',
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
      const options = { params: httpParams, headers: environment.headers };
      this.http.post(this.addDeliveryUrl, null, options).subscribe(
        (response) => {
          this.dialog.closeAll();
          this.firstFormGroup.reset();
          this.clickedPlant = null;
          this.clickedContract = null;
          this.getDeliveriesByStatus('undispatched');
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
