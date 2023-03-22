import { Component } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'suppRelFrontend';

  public getHeaders(): HttpHeaders {
    console.log(localStorage.getItem('token'));
    return new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`)
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS')
      .set('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token')
      .set('Content-Type', 'application/json');

  }
}
