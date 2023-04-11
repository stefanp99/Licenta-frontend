import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, Inject, ViewChild, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslationService } from '../language-changer/translation-service';
import { SystemConfiguration } from './system-configuration';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatButtonToggle } from '@angular/material/button-toggle';
import { HttpHeadersService } from '../http-headers-service';

export interface TableData {
  [key: string]: any;
}


@Component({
  selector: 'app-system-configurations',
  templateUrl: './system-configurations.component.html',
  styleUrls: ['./system-configurations.component.css']
})
export class SystemConfigurationsComponent implements OnInit {
  private systemConfigurationsUrl = 'http://localhost:8080/system-configurations/get-by-group-and-name';
  modifyUrl = 'http://localhost:8080/system-configurations/modify';
  displayedColumnsSystemConfigurations: string[] = ['configGroup', 'configName', 'configValues', 'edit', 'save'];
  displayedColumnsSystemConfigurationsValues: string[] = ['key', 'value'];
  configs: any[] = [];

  dataSourceSystemConfigurations = new MatTableDataSource([]);
  dataSourceWithKeyValue = new MatTableDataSource([]);

  parsedData: TableData[];

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialogRef: MatDialogRef<SystemConfigurationsComponent>,
    @Inject(MAT_DIALOG_DATA) public systemConfigurations: SystemConfiguration[],
    private _liveAnnouncer: LiveAnnouncer,
    public translationService: TranslationService,
    private http: HttpClient,
    private dialog: MatDialog,
    private httpHeadersService: HttpHeadersService,
  ) { }

  ngOnInit(): void {
    this.getSystemConfigurations();
  }

  getSystemConfigurations() {
    const httpParams: HttpParams = new HttpParams();
    const options = { params: httpParams, headers: this.httpHeadersService.getHttpHeaders() };
    this.http.get<SystemConfiguration[]>(this.systemConfigurationsUrl, options).subscribe(
      response => {
        this.systemConfigurations = response;
        this.dataSourceSystemConfigurations.data = this.systemConfigurations;
        this.parsedData = this.dataSourceSystemConfigurations.data.map(config => {
          this.configs.push(JSON.parse(config.configValues));
          return { ...JSON.parse(config.configValues) };
        });
        this.dataSourceWithKeyValue = new MatTableDataSource(this.parsedData);
        this.dataSourceSystemConfigurations.sortingDataAccessor = (data, sortHeaderId) => data[sortHeaderId];
        this.dataSourceSystemConfigurations.sort = this.sort;
      },
      error => {
        console.error(error);
      }
    );
  }

  changeEditMode(element: SystemConfiguration) {
    element.editMode = !element.editMode;
  }

  saveElement(element: SystemConfiguration, i: number) {
    element.configValues = JSON.stringify(this.configs[i]);
    this.changeEditMode(element);
    const httpParams = new HttpParams()
      .set('configGroup', element.configGroup)
      .set('configName', element.configName)
      .set('newConfig', element.configValues);
    const options = { params: httpParams, headers: this.httpHeadersService.getHttpHeaders() };
    this.http.put<SystemConfiguration>(this.modifyUrl, null, options).subscribe(
      response => {
      },
      error => {
        console.error(error);
      }
    );
  }


  onNoClick(): void {
    this.dialogRef.close();
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
