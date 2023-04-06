import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslationService } from '../language-changer/translation-service';
import { SystemConfiguration } from './system-configuration';
import { ConfigValuesTablePipe } from './config-values-table.pipe';

export interface TableData {
  [key: string]: any;
}


@Component({
  selector: 'app-system-configurations',
  templateUrl: './system-configurations.component.html',
  styleUrls: ['./system-configurations.component.css']
})
export class SystemConfigurationsComponent {
  displayedColumnsSystemConfigurations: string[] = ['configGroup', 'configName', 'configValues'];
  displayedColumnsSystemConfigurationsValues: string[] = ['key', 'value'];

  dataSourceSystemConfigurations = new MatTableDataSource([]);
  dataSourceWithKeyValue = new MatTableDataSource([]);

  parsedData: TableData[];

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialogRef: MatDialogRef<SystemConfigurationsComponent>,
    @Inject(MAT_DIALOG_DATA) public systemConfigurations: SystemConfiguration[],
    private _liveAnnouncer: LiveAnnouncer,
    public translationService: TranslationService,
  ) {
    this.dataSourceSystemConfigurations.data = systemConfigurations;
    this.dataSourceSystemConfigurations.sort = this.sort;
    this.parsedData = this.dataSourceSystemConfigurations.data.map(config => {
      return { ...JSON.parse(config.configValues) };
    });
    this.dataSourceWithKeyValue = new MatTableDataSource(this.parsedData);
  }

  getColumnNames(): string[] {
    let columnNames: string[] = [];
    for (const element of this.parsedData) {
      columnNames = [...columnNames, ...Object.keys(element)];
    }
    return Array.from(new Set(columnNames));
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
