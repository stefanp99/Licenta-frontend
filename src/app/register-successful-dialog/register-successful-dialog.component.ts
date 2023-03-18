import { Component } from '@angular/core';

@Component({
  selector: 'app-register-successful-dialog',
  template: `<h2 mat-dialog-title>Registration successful</h2>
  <mat-dialog-content>
    <p>You may now login.</p>
  </mat-dialog-content>
  <mat-dialog-actions>
    <button mat-button [mat-dialog-close]="true">Ok</button>
  </mat-dialog-actions>`
})
export class RegisterSuccessfulDialogComponent {

}
