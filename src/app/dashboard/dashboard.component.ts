//TODO: add reset password button
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from "../../environments/environment";
import { HttpHeadersService } from '../http-headers-service';
import { TranslationService } from '../language-changer/translation-service';
import { SystemConfigurationsComponent } from '../system-configurations/system-configurations.component';
import { MatDialog } from '@angular/material/dialog';
import { SystemConfiguration } from '../system-configurations/system-configuration';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private logoutUrl = 'http://localhost:8080/auth/logout';
  private loggedUserUrl = 'http://localhost:8080/users/logged-user-dto';
  private systemConfigurationsUrl = 'http://localhost:8080/system-configurations/get-by-group-and-name';

  userDetails: any = {};
  systemConfigurations: SystemConfiguration[];
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
    this.getSystemConfigurations();
  }

  getSystemConfigurations() {
    const httpParams: HttpParams = new HttpParams();
    const options = { params: httpParams, headers: this.httpHeadersService.getHttpHeaders() };
    this.http.get<SystemConfiguration[]>(this.systemConfigurationsUrl, options).subscribe(
      response => {
        this.systemConfigurations = response;
      },
      error => {
        console.error(error);
      }
    );
  }

  openDialogSystemConfigurations() {
    const dialogRef = this.dialog.open(SystemConfigurationsComponent, {
      data: this.systemConfigurations,
    });

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

}
