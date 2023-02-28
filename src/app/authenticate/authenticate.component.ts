import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent implements OnInit {
  registrationForm: FormGroup;
  loginForm: FormGroup;
  resetPasswordForm: FormGroup;
  invalidPassword: boolean;
  successfulRegistration: boolean;

  private registrationUrl = 'http://localhost:8080/auth/register';
  private authenticateUrl = 'http://localhost:8080/auth/authenticate';
  private resetPasswordUrl = 'http://localhost:8080/auth/email-reset-password';
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.registrationForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      emailAddress: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
    this.resetPasswordForm = new FormGroup({
      emailAddress: new FormControl('', [Validators.required, Validators.email])
    })
  }

  onRegistrationSubmit() {
    this.successfulRegistration = false;
    const formValue = this.registrationForm.value;

    this.http.post(this.registrationUrl, formValue).subscribe(
      (response) => {
        console.log('Registration successful!', response);
        this.registrationForm.reset();
        this.successfulRegistration = true;
        // this.loginForm.setValue({ username: this.registrationForm.value.username, password: this.registrationForm.value.password })
        // this.onLoginSubmit();
      },
      (error) => {
        console.error('Registration failed!', error);
      }
    );
  }

  onLoginSubmit() {
    this.invalidPassword = false;
    const formValue = this.loginForm.value;

    this.http.post(this.authenticateUrl, formValue).subscribe(
      (response: any) => {
        console.log('Authenticate successful!', response);
        localStorage.setItem('token', response.token);
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.error('Authenticate failed!', error);
        this.invalidPassword = true;
      }
    );
  }

  resetPassword() {
    const params = new HttpParams().set('emailAddress', this.resetPasswordForm.value.emailAddress);

    this.http.post(this.resetPasswordUrl, null, { params }).subscribe(
      (response: any) => {
        console.log('Sent Reset Password Email!', response);
      },
      (error) => {
        console.error('Authenticate failed!', error);
      }
    );
    this.resetPasswordForm.reset();
  }


}
