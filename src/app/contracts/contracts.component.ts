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
import { Contract } from './contract';
import { Plant } from '../plants/plant';
import { Supplier } from '../suppliers/supplier';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatFormField } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpHeadersService } from '../http-headers-service';


@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.css']
})
export class ContractsComponent implements OnInit {
  private getContractsUrl = 'http://localhost:8080/contracts/get-by-plantId-supplierId-materialCode';
  private addContractUrl = 'http://localhost:8080/contracts/add'
  private updateContractUrl = 'http://localhost:8080/contracts/update'
  private deleteContractUrl = 'http://localhost:8080/contracts/delete'
  private plantsUrl = 'http://localhost:8080/plants/plants-by-city-country-segment';
  private suppliersUrl = 'http://localhost:8080/suppliers/get-suppliers-by-city-country';
  allContracts: Contract[];
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
  dataSourceContracts = new MatTableDataSource([]);
  getContractsFormGroup: FormGroup;
  addContractsFormGroup: FormGroup;
  displayedColumnsContracts: string[] = ['supplierId', 'supplierName', 'materialCode', 'plantId', 'pricePerUnit', 'update', 'delete'];
  materialCodes: string[] = [];
  plantIds: string[] = [];
  pricePerUnits: number[] = [];
  editMode: boolean = false;
  clickedContract: Contract;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('dialogAddContract') dialogAddContract: any;
  @ViewChild('dialogDeleteContract') dialogDeleteContract: any;

  constructor(private dialog: MatDialog, private http: HttpClient, private router: Router,
    private _liveAnnouncer: LiveAnnouncer, private _snackBar: MatSnackBar, private httpHeadersService: HttpHeadersService) {
  }

  ngAfterViewInit() {
    this.dataSourceContracts.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getContractsFormGroup = new FormGroup({
      plantId: new FormControl('', []),
      supplierId: new FormControl('', []),
      materialCode: new FormControl('', [])
    });
    this.addContractsFormGroup = new FormGroup({
      plantId: new FormControl('', []),
      supplierId: new FormControl('', []),
      materialCode: new FormControl('', []),
      pricePerUnit: new FormControl(null, [])
    });
    this.getContracts();
    this.getPlants();
    this.getSuppliers();
    this.filteredOptionsSuppliers = this.myControlSuppliers.valueChanges.pipe(
      startWith(''),
      map(value => this._filterSuppliers(value || '')),
    );
    this.filteredOptionsPlants = this.myControlPlants.valueChanges.pipe(
      startWith(''),
      map(value => this._filterPlants(value || '')),
    );
    this.filteredOptionsSuppliersAdd = this.myControlSuppliersAdd.valueChanges.pipe(
      startWith(''),
      map(value => this._filterSuppliers(value || '')),
    );
    this.filteredOptionsPlantsAdd = this.myControlPlantsAdd.valueChanges.pipe(
      startWith(''),
      map(value => this._filterPlants(value || '')),
    );
    this.dataSourceContracts.sortingDataAccessor = (contract, property) => {
      switch (property) {
        case 'supplierId':
          return contract.supplier.id;
        case 'supplierName':
          return contract.supplier.name;
        default:
          return contract[property];
      }
    };
  }

  changeEditMode() {
    this.editMode = !this.editMode;
    this.getContracts();
  }

  getContracts() {
    const httpParams: HttpParams = new HttpParams()
      .set('plantId', this.getContractsFormGroup.value.plantId)
      .set('supplierId', this.getContractsFormGroup.value.supplierId)
      .set('materialCode', this.getContractsFormGroup.value.materialCode);
    const options = { params: httpParams, headers: this.httpHeadersService.getHttpHeaders() };
    this.http.get<Contract[]>(this.getContractsUrl, options).subscribe(
      response => {
        this.allContracts = response;
        this.dataSourceContracts.data = this.allContracts;
        this.dataSourceContracts.sort = this.sort;
        this.allContracts.forEach(contract => {
          this.materialCodes[this.allContracts.indexOf(contract)] = contract.materialCode;
          this.plantIds[this.allContracts.indexOf(contract)] = contract.plant.id;
          this.pricePerUnits[this.allContracts.indexOf(contract)] = contract.pricePerUnit;
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
        this.plants.forEach(plant => {
          this.optionsPlants.push(plant.id);
        });
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
        // this.dataSourcePlants.data = this.plants;
        // this.dataSourcePlants.sort = this.sort;
      },
      error => {
        console.error(error);
      }
    );
  }

  searchContracts() {
    this.getContractsFormGroup.value.plantId = this.myControlPlants.value;
    this.getContractsFormGroup.value.supplierId = this.myControlSuppliers.value;
    this.getContracts();
  }

  addContract() {
    this.addContractsFormGroup.value.supplierId = this.myControlSuppliersAdd.value;
    this.addContractsFormGroup.value.plantId = this.myControlPlantsAdd.value;

    const httpParams: HttpParams = new HttpParams()
      .set('plantId', this.addContractsFormGroup.value.plantId)
      .set('supplierId', this.addContractsFormGroup.value.supplierId)
      .set('materialCode', this.addContractsFormGroup.value.materialCode)
      .set('pricePerUnit', this.addContractsFormGroup.value.pricePerUnit)

    const options = { params: httpParams, headers: this.httpHeadersService.getHttpHeaders() };
    this.http.post<Contract>(this.addContractUrl, null, options).subscribe(
      response => {
        this.clearForms();
        this.searchContracts();
        this.openSnackBar('Contract added', 'Close', 5000);
      },
      error => {
        console.error(error);
      }
    );
  }

  openDialogAddContract() {
    const dialogRef = this.dialog.open(this.dialogAddContract, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  clearForms() {
    this.getContractsFormGroup.reset();
    this.addContractsFormGroup.reset();
    this.myControlPlants.reset();
    this.myControlSuppliers.reset();
  }

  updateContract(contract: Contract, i: number) {
    contract.materialCode = this.materialCodes[i];
    contract.plant.id = this.plantIds[i];
    contract.pricePerUnit = this.pricePerUnits[i];

    const httpParams: HttpParams = new HttpParams()
      .set('id', contract.id)
      .set('plantId', contract.plant.id)
      .set('supplierId', contract.supplier.id)
      .set('materialCode', contract.materialCode)
      .set('pricePerUnit', contract.pricePerUnit);

    const options = { params: httpParams, headers: this.httpHeadersService.getHttpHeaders() };
    this.http.put<Contract>(this.updateContractUrl, null, options).subscribe(
      response => {
        this.searchContracts();
        this.openSnackBar('Contract updated', 'Close', 5000);
      },
      error => {
        console.error(error);
      }
    );
  }

  deleteContract(contract: Contract) {
    const httpParams: HttpParams = new HttpParams()
      .set('id', contract.id);

    const options = { params: httpParams, headers: this.httpHeadersService.getHttpHeaders() };
    this.http.delete<Contract>(this.deleteContractUrl, options).subscribe(
      response => {
        this.searchContracts();
        this.openSnackBar('Contract deleted', 'Close', 5000);
      },
      error => {
        console.error(error);
      }
    );
  }

  openDialogDeleteContract(contract: Contract) {
    this.clickedContract = contract;
    const dialogRef = this.dialog.open(this.dialogDeleteContract, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
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

  applyFilterContracts(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceContracts.filter = filterValue.trim().toLowerCase();
    this.dataSourceContracts.filterPredicate = (data, filter: string) => {
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
