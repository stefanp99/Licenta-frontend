import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {
  newPasswordForm: FormGroup;
  private newPasswordUrl = 'http://localhost:8080/auth/newPassword';

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.newPasswordForm = new FormGroup({
      password: new FormControl('', Validators.required)
    });
  }


  onNewPasswordSubmit() {
    const formValue = {
      ...this.newPasswordForm.value,
      resetPasswordToken: localStorage.getItem('resetPasswordToken')
    };
    this.http.post(this.newPasswordUrl, formValue).subscribe(
      (response: any) => {
        console.log('Authenticate successful!', response);
        localStorage.removeItem('resetPasswordToken');
        localStorage.setItem('token', response.token);
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.error('Authenticate failed!', error);
      }
    );
  }

}
