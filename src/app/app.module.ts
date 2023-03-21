import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { RegisterSuccessfulDialogComponent } from './register-successful-dialog/register-successful-dialog.component';
import { DeliveriesComponent } from './deliveries/deliveries.component';
import { DeviationsComponent } from './deviations/deviations.component';
import { ContractsComponent } from './contracts/contracts.component';
import { TolerancesComponent } from './tolerances/tolerances.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { PlantsComponent } from './plants/plants.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthenticateComponent,
    DashboardComponent,
    ChangePasswordComponent,
    NewPasswordComponent,
    RegisterSuccessfulDialogComponent,
    DeliveriesComponent,
    DeviationsComponent,
    ContractsComponent,
    TolerancesComponent,
    SuppliersComponent,
    PlantsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatGridListModule,
    MatTabsModule,
    MatSelectModule,
    MatTableModule,
    MatSortModule,
    MatCardModule,
    MatStepperModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatAutocompleteModule,
    MatButtonToggleModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
