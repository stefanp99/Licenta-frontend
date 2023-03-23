import { Component } from '@angular/core';
import { TranslationService } from '../language-changer/translation-service';

@Component({
  selector: 'app-register-successful-dialog',
  template: `<h2 mat-dialog-title>{{this.translationService.getTranslation('registrationSuccessful')}}!</h2>
  <mat-dialog-content>
    <p>{{this.translationService.getTranslation('loginNowDialog')}}.</p>
  </mat-dialog-content>
  <mat-dialog-actions>
    <button mat-button [mat-dialog-close]="true">Ok</button>
  </mat-dialog-actions>`
})
export class RegisterSuccessfulDialogComponent {
  constructor(public translationService: TranslationService) {

  }

}
