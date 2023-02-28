import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  private changePasswordUrl = 'http://localhost:8080/auth/changePassword';
  private token: string;

  private resetAllowed: boolean;
  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.token = this.activatedRoute.snapshot.params.token;
      this.verifyTokenChangePassword(this.token).subscribe((isValid: boolean) => {
        if (isValid) {
          localStorage.setItem('resetPasswordToken', this.token);
          this.router.navigate(['/reset-password']);
        } else {
          this.router.navigate(['/authenticate']);
        }
      });
    });
  }

  verifyTokenChangePassword(token: string): Observable<boolean> {
    const params = new HttpParams().set('token', token);

    return this.http.post(this.changePasswordUrl, null, { params }).pipe(
      map((response: any) => {
        console.log(response.token);
        if (response.token === 'invalid' || response.token === 'expired' || response == null) {
          return false;
        }
        return true;
      }),
      catchError((error) => {
        console.log(error);
        return of(false);
      })
    );
  }

}
