import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Deviation } from './deviation';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { HttpHeadersService } from '../http-headers-service';
import { TranslationService } from '../language-changer/translation-service';
import { SupplierTooltip } from '../suppliers/supplierTooltip';
import { Supplier } from '../suppliers/supplier';
import { Plant } from '../plants/plant';

@Component({
  selector: 'app-deviations',
  templateUrl: './deviations.component.html',
  styleUrls: ['./deviations.component.css']
})
export class DeviationsComponent implements OnInit {
  deviationTypes = [{ key: 1, value: 'qtyMinus' }, { key: 2, value: 'qtyPlus' }, { key: 3, value: 'dayMinus' }, { key: 4, value: 'dayPlus' }];
  displayedColumnsDeviations: string[] = ['creationDate', 'type', 'quantityDiff', 'timeDiff', 'supplierId', 'materialCode', 'pricePerUnit', 'plantId'];
  private deviationByTypeSupplierMaterialPlantsUrl = 'http://localhost:8080/deviations/by-type-supplier-material-plant';
  private tooltipsUrl = 'http://localhost:8080/suppliers/tooltips';
  private plantsUrl = 'http://localhost:8080/plants/plants-by-city-country-segment';
  private suppliersUrl = 'http://localhost:8080/suppliers/get-suppliers-by-city-country';
  allDeviations: Deviation[];
  plants: Plant[];
  suppliers: Supplier[];
  dataSourceDeviations = new MatTableDataSource([]);
  selectedTypes: string[] = [];
  supplierTooltips: SupplierTooltip[];
  getDeviationsFormGroup: FormGroup;
  optionsSuppliers: string[] = [];
  optionsPlants: string[] = [];
  myControlSuppliers = new FormControl('');
  myControlPlants = new FormControl('');
  filteredOptionsSuppliers: Observable<string[]>;
  filteredOptionsPlants: Observable<string[]>;

  selectTypesFormGroup: FormGroup;

  areArraysEqual = (a: string[], b: string[]) => {
    if (a.length !== b.length) return false;

    // Check if every element in array a is in array b
    const inB = a.every(element => b.includes(element));
    if (!inB) return false;

    // Check if every element in array b is in array a
    const inA = b.every(element => a.includes(element));
    if (!inA) return false;

    // The arrays are equal
    return true;
  };

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('allSelected') allSelected: MatOption;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private dialog: MatDialog, private http: HttpClient, private router: Router,
    private _liveAnnouncer: LiveAnnouncer, private httpHeadersService: HttpHeadersService, public translationService: TranslationService) {
  }

  ngAfterViewInit() {
    this.dataSourceDeviations.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getAllSupplierToolTips();
    this.selectTypesFormGroup = new FormGroup({
      deviationType: new FormControl('', []),
    });
    this.getDeviationsFormGroup = new FormGroup({
      type: new FormControl('', []),
      plantId: new FormControl('', []),
      supplierId: new FormControl('', []),
      materialCode: new FormControl('', [])
    });
    this.getDeviations();
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
    this.dataSourceDeviations.sortingDataAccessor = (deviation, property) => {
      switch (property) {
        case 'supplierId':
          return deviation.delivery.contract.supplier.id;
        case 'materialCode':
          return deviation.delivery.contract.materialCode;
        case 'pricePerUnit':
          return deviation.delivery.contract.pricePerUnit;
        case 'plantId':
          return deviation.delivery.contract.plant.id;
        default:
          return deviation[property];
      }
    };
  }

  public getDeviations() {
    let typeParam = '';
    let deviationType = this.selectTypesFormGroup.get('deviationType').value;
    if (deviationType) {
      for (let index = 0; index < deviationType.length; index++) {
        if (deviationType[index] !== 0)
          typeParam += this.deviationTypes[deviationType[index] - 1].value + ',';
      }
    }
    else
      deviationType = 'qtyMinus,qtyPlus,dayMinus,dayPlus';
    typeParam = typeParam.slice(0, -1);
    const httpParams: HttpParams = new HttpParams()
      .set('type', typeParam)
      .set('plantId', this.getDeviationsFormGroup.value.plantId)
      .set('supplierId', this.getDeviationsFormGroup.value.supplierId)
      .set('materialCode', this.getDeviationsFormGroup.value.materialCode);;
    const options = { params: httpParams, headers: this.httpHeadersService.getHttpHeaders() };
    this.http.get<Deviation[]>(this.deviationByTypeSupplierMaterialPlantsUrl, options).subscribe(
      response => {
        this.allDeviations = response;
        this.dataSourceDeviations.data = this.allDeviations;
        this.dataSourceDeviations.sort = this.sort;
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

  searchDeviations() {
    this.getDeviationsFormGroup.value.plantId = this.myControlPlants.value;
    this.getDeviationsFormGroup.value.supplierId = this.myControlSuppliers.value;
    this.getDeviations();
  }

  clearForms() {
    this.getDeviationsFormGroup.reset();
    this.myControlPlants.reset();
    this.myControlSuppliers.reset();
    this.selectTypesFormGroup.reset();
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

  applyFilterDeviations(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceDeviations.filter = filterValue.trim().toLowerCase();
    this.dataSourceDeviations.filterPredicate = (data, filter: string) => {
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

  togglePerOne(all) {
    if (this.allSelected.selected) {
      this.allSelected.deselect();
      return false;
    }
    if (this.selectTypesFormGroup.controls.deviationType.value.length == this.deviationTypes.length)
      this.allSelected.select();

  }
  toggleAllSelection() {
    if (this.allSelected.selected) {
      this.selectTypesFormGroup.controls.deviationType
        .patchValue([...this.deviationTypes.map(item => item.key), 0]);
    } else {
      this.selectTypesFormGroup.controls.deviationType.patchValue([]);
    }
  }
}


