//TODO: add reset password button
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from "../../environments/environment";
import { HttpHeadersService } from '../http-headers-service';
import { TranslationService } from '../language-changer/translation-service';
import { SystemConfigurationsComponent } from '../system-configurations/system-configurations.component';
import { MatDialog } from '@angular/material/dialog';
import { SystemConfiguration } from '../system-configurations/system-configuration';
import { DeliveriesComponent } from '../deliveries/deliveries.component';
import { DeviationsComponent } from '../deviations/deviations.component';
import { TolerancesComponent } from '../tolerances/tolerances.component';
import { ContractsComponent } from '../contracts/contracts.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild(DeliveriesComponent) deliveriesComponent: DeliveriesComponent;
  @ViewChild(DeviationsComponent) deviationsComponent: DeviationsComponent;
  @ViewChild(TolerancesComponent) tolerancesComponent: TolerancesComponent;
  @ViewChild(ContractsComponent) contractsComponent: ContractsComponent;

  selectedTabIndex = 0;

  private logoutUrl = 'http://localhost:8080/auth/logout';
  private loggedUserUrl = 'http://localhost:8080/users/logged-user-dto';

  userDetails: any = {};
  constructor(private http: HttpClient, private router: Router, private httpHeadersService: HttpHeadersService,
    public translationService: TranslationService, public dialog: MatDialog) { }

  ngOnInit(): void {
    let headers = this.httpHeadersService.getHttpHeaders();
    this.http.get<any>(this.loggedUserUrl, { headers }).subscribe(
      response => {
        this.userDetails = response;
      },
      error => {
        console.error(error);
      }
    );
  }

  openDialogSystemConfigurations() {
    const dialogRef = this.dialog.open(SystemConfigurationsComponent, {});

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  logout() {
    let headers = this.httpHeadersService.getHttpHeaders();
    // Make API call to logout
    this.http.post(this.logoutUrl, null, { headers }).subscribe((respone) => {
      localStorage.clear();
      this.router.navigate(['/authenticate']);
    },
      (error) => {
        localStorage.clear();
        this.router.navigate(['/authenticate']);
      });
  }

  onTabSelection(event) {
    this.selectedTabIndex = event.index;
  }

}
