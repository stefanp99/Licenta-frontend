import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslationService } from '../language-changer/translation-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Supplier } from '../suppliers/supplier';
import { HttpHeadersService } from '../http-headers-service';
import { Rating } from './rating';
import { MatOption } from '@angular/material/core';
import { Plant } from '../plants/plant';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SupplierTooltip } from '../suppliers/supplierTooltip';
import { MatSelect } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';


@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css']
})
export class RatingsComponent implements OnInit {
  displayedColumnsRatings = ['supplierId', 'materialCode', 'plantId', 'qtyDeviationCurveRating', 'dayDeviationCurveRating',
    'qtyNrDevisRating', 'dayNrDevisRating', 'totalNumberDeliveries', 'correctDeliveriesPercentage', 'priceDeviationPercentage',
    'averageNumberOfHoursToDeliver', 'averageLeadTimeInHours', 'distanceToPlant'];
  private getRatingsUrl = 'http://localhost:8080/ratings/by-supplier-material-plant-type';
  private getSuppliersUrl = 'http://localhost:8080/suppliers/get-suppliers-by-city-country';
  private getPlantsUrl = 'http://localhost:8080/plants/plants-by-city-country-segment';
  private getPlantsByIdUrl = 'http://localhost:8080/plants/by-id'
  private getMaterialsUrl = 'http://localhost:8080/contracts/allMaterialCodes';
  private calculateRatingsUrl = 'http://localhost:8080/ratings/calculateRatings';
  private tooltipsUrl = 'http://localhost:8080/suppliers/tooltips';
  dataSourceRatings = new MatTableDataSource([]);
  getRatingsFormGroup: FormGroup;
  ratings: Rating[];
  suppliers: Supplier[];
  plants: Plant[];
  materials: string[];
  supplierTooltips: SupplierTooltip[];
  supplierTooltipsForMap: SupplierTooltip[];
  plantsForMap: Plant[];
  supplierIds: { key: number, value: string }[] = [];
  plantIds: { key: number, value: string }[] = [];
  chartType: string;
  ratingType: string;
  allSelectedSupplier = false;
  allSelectedPlant = false;
  isLoading = false;
  optionsMaterials: string[] = [];
  myControlMaterials = new FormControl('');
  filteredOptionsMaterials: Observable<string[]>;
  isMapSearched: boolean;

  multi: any[];
  view: any[] = [];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string;
  showYAxisLabel: boolean = true;
  timeline: boolean = true;
  yAxisLabel: string;
  legendTitle: string;
  legendPosition: string = 'right';
  isDoughnut: boolean = false;
  showLabels: boolean = true;
  colorScheme = {
    domain: ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'black', 'white', 'gray', 'brown', 'beige', 'turquoise', 'gold', 'silver', 'navy', 'maroon', 'olive', 'teal', 'magenta']
  };

  @ViewChild('selectedSupplier') selectedSupplier: MatSelect;
  @ViewChild('selectedPlant') selectedPlant: MatSelect;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('dialogCalculateRatings') dialogCalculateRatings: any;

  constructor(public translationService: TranslationService, private http: HttpClient,
    private httpHeadersService: HttpHeadersService, private _liveAnnouncer: LiveAnnouncer,
    private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getAllSupplierToolTips();
    this.getRatingsFormGroup = new FormGroup({
      supplierId: new FormControl('', [Validators.required]),
      materialCode: new FormControl('', []),
      plantId: new FormControl('', []),
      ratingType: new FormControl('', [Validators.required]),
      chart: new FormControl('', [Validators.required]),
    });
    this.getSuppliers();
    this.getPlants();
    this.getMaterials();
    this.dataSourceRatings.sortingDataAccessor = (rating, property) => {
      switch (property) {
        case 'supplierId':
          return rating.supplier.id;
        default:
          return rating[property];
      }
    }
  }

  openDialogCalculateRatings() {
    const dialogRef = this.dialog.open(this.dialogCalculateRatings, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  calculateRatings() {
    const httpParams: HttpParams = new HttpParams();
    const options = { params: httpParams, headers: this.httpHeadersService.getHttpHeaders() };
    this.isLoading = true;
    this.http.post<any>(this.calculateRatingsUrl, options).subscribe(
      response => {
        this.isLoading = false;
      },
      error => {
        console.error(error);
      }
    )
  }

  searchRatings() {
    if (this.chartType === 'map') {
      if (this.isMapSearched)
        this.isMapSearched = false;
      this.getSupplierPlantsForMap();
    }
    else {
      this.isMapSearched = false;
      this.supplierTooltipsForMap = undefined;
      this.plantsForMap = undefined;
      this.getRatings();
    }
  }

  getRatings() {
    this.xAxisLabel = this.translationService.getTranslation('supplierId');
    const httpParams: HttpParams = new HttpParams()
      .set('supplierId', this.getRatingsFormGroup.value.supplierId)
      .set('materialCode', this.getRatingsFormGroup.value.materialCode)
      .set('plantId', this.getRatingsFormGroup.value.plantId)
      .set('ratingType', this.getRatingsFormGroup.value.ratingType)
      .set('chart', this.getRatingsFormGroup.value.chart);
    const options = { params: httpParams, headers: this.httpHeadersService.getHttpHeaders() };
    this.http.get<any>(this.getRatingsUrl, options).subscribe(
      response => {
        this.legendTitle = this.translationService.getTranslation('legend');
        this.chartType = this.getRatingsFormGroup.value.chart;
        this.ratingType = this.getRatingsFormGroup.value.ratingType;
        if (this.chartType === 'table') {
          this.ratings = response;
          this.dataSourceRatings.data = this.ratings;
          this.dataSourceRatings.sort = this.sort;
          this.dataSourceRatings.paginator = this.paginator;
        }
        else {
          switch (this.chartType) {
            case 'curveCorrectPerc': {
              this.yAxisLabel = this.translationService.getTranslation('rating01');
              break;
            }
            case 'averageHours': {
              this.yAxisLabel = this.translationService.getTranslation('averageHours');
              break;
            }
            case 'totalNrDeliveries': {
              this.yAxisLabel = this.translationService.getTranslation('totalNumberDeliveries');
              break;
            }
            case 'priceDeviation': {
              this.yAxisLabel = this.translationService.getTranslation('priceDeviation');
              break;
            }
            case 'distanceToPlant': {
              this.yAxisLabel = this.translationService.getTranslation('distanceToPlant');
              break;
            }
          }
          if (this.chartType === 'curveCorrectPerc' || this.chartType === 'averageHours')
            this.multi = this.translateResponse(response);
          else
            this.multi = response;
        }
      },
      error => {
        console.error(error);
      }
    )
  }

  getSuppliers() {
    const httpParams: HttpParams = new HttpParams();
    const options = { params: httpParams, headers: this.httpHeadersService.getHttpHeaders() };
    this.http.get<Supplier[]>(this.getSuppliersUrl, options).subscribe(
      response => {
        this.suppliers = response;
        this.suppliers.forEach(supplier => {
          this.supplierIds.push({ key: this.suppliers.indexOf(supplier), value: supplier.id });
        })
      },
      error => {
        console.error(error);
      }
    );
  }

  getPlants() {
    const httpParams: HttpParams = new HttpParams();
    const options = { params: httpParams, headers: this.httpHeadersService.getHttpHeaders() };
    this.http.get<Plant[]>(this.getPlantsUrl, options).subscribe(
      response => {
        this.plants = response;
        this.plants.forEach(plant => {
          this.plantIds.push({ key: this.plants.indexOf(plant), value: plant.id });
        });
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

  changeRatingType(event) {
    this.multi = null;
    this.ratingType = event;
    if (this.ratingType === 'material' || this.ratingType === 'specific') {
      this.getRatingsFormGroup.controls['materialCode'].setValidators(Validators.required);
    }
    else {
      this.getRatingsFormGroup.controls['materialCode'].clearValidators();
    }
    if (this.ratingType === 'plant' || this.ratingType === 'specific') {
      this.getRatingsFormGroup.controls['plantId'].setValidators(Validators.required);
    }
    else {
      this.getRatingsFormGroup.controls['plantId'].clearValidators();
    }
    this.getRatingsFormGroup.controls['materialCode'].updateValueAndValidity();
    this.getRatingsFormGroup.controls['plantId'].updateValueAndValidity();
  }

  changeChartType(event) {
    this.multi = null;
    this.chartType = event;
    if (this.chartType === 'priceDeviation') {
      this.getRatingsFormGroup.get('ratingType').setValue('material');
      this.getRatingsFormGroup.controls['materialCode'].setValidators(Validators.required);
    }
    else {
      this.getRatingsFormGroup.controls['materialCode'].clearValidators();
    }
    if (this.chartType === 'distanceToPlant') {
      this.getRatingsFormGroup.get('ratingType').setValue('plant');
      this.getRatingsFormGroup.controls['plantId'].setValidators(Validators.required);
    }
    else {
      this.getRatingsFormGroup.controls['plantId'].clearValidators();
    }
    if (this.chartType === 'map') {
      this.getRatingsFormGroup.controls['ratingType'].clearValidators();
      this.getRatingsFormGroup.controls['supplierId'].clearValidators();
    }
    else {
      this.getRatingsFormGroup.controls['ratingType'].setValidators(Validators.required);
    }
    this.getRatingsFormGroup.controls['materialCode'].updateValueAndValidity();
    this.getRatingsFormGroup.controls['plantId'].updateValueAndValidity();
    this.getRatingsFormGroup.controls['ratingType'].updateValueAndValidity();
    this.getRatingsFormGroup.controls['supplierId'].updateValueAndValidity();
  }

  clearForms() {
    this.multi = null;
    this.getRatingsFormGroup.reset();
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

  getSupplierPlantsForMap() {
    let httpParams = new HttpParams().set('supplierId', this.getRatingsFormGroup.get('supplierId').value);
    let options = { params: httpParams, headers: this.httpHeadersService.getHttpHeaders() };
    this.http.get<SupplierTooltip[]>(this.tooltipsUrl, options).subscribe(
      response => {
        this.supplierTooltipsForMap = response;
        httpParams = new HttpParams().set('plantId', this.getRatingsFormGroup.get('plantId').value);
        options = { params: httpParams, headers: this.httpHeadersService.getHttpHeaders() };
        this.http.get<Plant[]>(this.getPlantsByIdUrl, options).subscribe(
          response => {
            this.plantsForMap = response;
            this.isMapSearched = true;
          },
          error => {
            console.error(error);
          }
        );
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

  onSelect(data): void {

  }

  onActivate(data): void {
  }

  onDeactivate(data): void {
  }

  private translateResponse(response) {
    response.forEach(element => {
      let series = element.series;
      series.forEach(serie => {
        serie.name = this.translationService.getTranslation(serie.name);
      });
    });
    return response;
  }

  toggleAllSelectionSuppliers() {
    this.allSelectedSupplier = !this.allSelectedSupplier;  // to control select-unselect

    if (this.allSelectedSupplier) {
      this.selectedSupplier.options.forEach((item: MatOption) => item.select());
    } else {
      this.selectedSupplier.options.forEach((item: MatOption) => { item.deselect() });
    }
  }

  toggleAllSelectionPlants() {
    this.allSelectedPlant = !this.allSelectedPlant;  // to control select-unselect

    if (this.allSelectedPlant) {
      this.selectedPlant.options.forEach((item: MatOption) => item.select());
    } else {
      this.selectedPlant.options.forEach((item: MatOption) => { item.deselect() });
    }
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  applyFilterRatings(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceRatings.filter = filterValue.trim().toLowerCase();
    this.dataSourceRatings.filterPredicate = (data, filter: string) => {
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

  private _filterMaterials(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.optionsMaterials.filter(option => option.toLowerCase().includes(filterValue));
  }

}
