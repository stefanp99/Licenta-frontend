//TODO: add reset password button
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private logoutUrl = 'http://localhost:8080/auth/logout';
  private loggedUserUrl = 'http://localhost:8080/users/logged-user-dto';
  userDetails: any = {};
  tabs: any[] = ['Tab 1', 'Tab 2', 'Tab 3'];
  activeTab: any = this.tabs[0];

  selectTab(tab: any) {
    this.activeTab = tab;
  }



  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`)
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS')
      .set('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token')
      .set('Content-Type', 'application/json');
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
    // Make API call to logout
    this.http.post(this.logoutUrl, {}, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${localStorage.getItem('token')}`)
        .set('Access-Control-Allow-Origin', '*')
        .set('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS')
        .set('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token')
        .set('Content-Type', 'application/json')
    }).subscribe((respone) => {
      localStorage.removeItem('token');
      this.router.navigate(['/authenticate']);
    },
      (error) => {
        localStorage.removeItem('token');
        this.router.navigate(['/authenticate']);
      });
  }

}
