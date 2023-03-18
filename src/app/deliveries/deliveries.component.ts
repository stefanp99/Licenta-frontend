import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatSort, Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { environment } from "../../environments/environment";
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

export interface Contract {
  id: number,
  supplierId: number,
  materialCode: string,
  pricePerUnit: number,
  plantId: number
}

export interface Delivery {
  id: number,
  expectedQuantity: number,
  status: string,
  dispatchDate: Date,
  deliveryDate: Date,
  contract: Contract,
  expectedDeliveryDate: Date
}

@Component({
  selector: 'app-deliveries',
  templateUrl: './deliveries.component.html',
  styleUrls: ['./deliveries.component.css']
})
export class DeliveriesComponent implements OnInit {
  displayedColumns: string[] = ['expectedQuantity', 'status', 'dispatchDate', 'deliveryDate', 'supplierId',
    'materialCode', 'pricePerUnit', 'plantId', 'expectedDeliveryDate', 'dispatchDelivery'];
  private deliveriesByStatusUrl = 'http://localhost:8080/deliveries/deliveries-by-status';
  private addDeliveryUrl = 'http://localhost:8080/deliveries/add-delivery';
  orders: Delivery[];
  dataSource = new MatTableDataSource([]);

  @ViewChild('dialogTemplate') dialogTemplate: any;

  addDeliveryForm: FormGroup;

  constructor(private dialog: MatDialog, private http: HttpClient, private router: Router, private _liveAnnouncer: LiveAnnouncer, private fb: FormBuilder) {
  }

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.getDeliveriesByStatus('undispatched');
    this.addDeliveryForm = new FormGroup({
      expectedQuantity: new FormControl(0, []),
      expectedDeliveryDate: new FormControl('', []),
      contractId: new FormControl(0, [])
    })
  }

  getDeliveriesByStatus(selectedStatus: string) {
    const httpParams: HttpParams = new HttpParams().set('status', selectedStatus);
    const options = { params: httpParams, headers: environment.headers };
    this.http.get<Delivery[]>(this.deliveriesByStatusUrl, options).subscribe(
      response => {
        this.orders = response;
        this.dataSource.data = this.orders;
        this.dataSource.sort = this.sort;
        console.log(this.dataSource);
      },
      error => {
        console.error(error);
      }
    );
  }

  dispatchDelivery(delivery: Delivery) {
    console.log(delivery.id);
  }

  deliverDelivery(delivery: Delivery) {
    console.log(delivery.id);
  }

  openDialog() {
    const dialogRef = this.dialog.open(this.dialogTemplate, {
      width: '500px',
      data: this.addDeliveryForm
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  submitForm() {
    if (this.addDeliveryForm.valid) {
      const formValue = this.addDeliveryForm.value;
      const options = { params: formValue, headers: environment.headers };
      this.http.post(this.addDeliveryUrl, null, options).subscribe(
        (response) => {
          this.dialog.closeAll();
          this.getDeliveriesByStatus('undispatched');
        },
        (error) => {
          console.error('Add failed!', error);
        }
      );
    }
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
}
