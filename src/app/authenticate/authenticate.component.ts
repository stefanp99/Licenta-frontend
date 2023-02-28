import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent implements OnInit {
  registrationForm: FormGroup;
  loginForm: FormGroup;

  private registrationUrl = 'http://localhost:8080/auth/register';
  private authenticateUrl = 'http://localhost:8080/auth/authenticate';
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
  }

  onRegistrationSubmit() {
    const formValue = this.registrationForm.value;

    this.http.post(this.registrationUrl, formValue).subscribe(
      (response) => {
        console.log('Registration successful!', response);
        this.router.navigate(['/authenticate']);
      },
      (error) => {
        console.error('Registration failed!', error);
      }
    );
  }
  onLoginSubmit() {
    const formValue = this.loginForm.value;

    this.http.post(this.authenticateUrl, formValue).subscribe(
      (response: any) => {
        console.log('Authenticate successful!', response);
        localStorage.setItem('token', response.token);
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.error('Authenticate failed!', error);
      }
    );
  }


}
