//TODO: add reset password button
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from "../../environments/environment";
import { HttpHeadersService } from '../http-headers-service';
import { TranslationService } from '../language-changer/translation-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private logoutUrl = 'http://localhost:8080/auth/logout';
  private loggedUserUrl = 'http://localhost:8080/users/logged-user-dto';
  userDetails: any = {};
  constructor(private http: HttpClient, private router: Router, private httpHeadersService: HttpHeadersService, public translationService: TranslationService) { }

  ngOnInit(): void {
    let headers = this.httpHeadersService.getHttpHeaders();//TODO: call a function to set authorization header everytime you get the headers
    this.http.get<any>(this.loggedUserUrl, { headers }).subscribe(
      response => {
        this.userDetails = response;
      },
      error => {
        console.error(error);
      }
    );
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
