//TODO: add reset password button
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from "../../environments/environment";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private logoutUrl = 'http://localhost:8080/auth/logout';
  private loggedUserUrl = 'http://localhost:8080/users/logged-user-dto';
  userDetails: any = {};
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    let headers = environment.headers;
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
    let headers = environment.headers;
    // Make API call to logout
    this.http.post(this.logoutUrl, {}, { headers }).subscribe((respone) => {
      localStorage.removeItem('token');
      this.router.navigate(['/authenticate']);
    },
      (error) => {
        localStorage.removeItem('token');
        this.router.navigate(['/authenticate']);
      });
  }

}
