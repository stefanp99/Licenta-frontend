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
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RegisterSuccessfulDialogComponent } from './register-successful-dialog/register-successful-dialog.component';
import { DeliveriesComponent } from './deliveries/deliveries.component';
import { DeviationsComponent } from './deviations/deviations.component';
import { ContractsComponent } from './contracts/contracts.component';
import { TolerancesComponent } from './tolerances/tolerances.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { PlantsComponent } from './plants/plants.component';
import { HttpHeadersService } from './http-headers-service';
import { LanguageChangerComponent } from './language-changer/language-changer.component';
import { SystemConfigurationsComponent } from './system-configurations/system-configurations.component';
import { ConfigValuesTablePipe } from './system-configurations/config-values-table.pipe';
import { RatingsComponent } from './ratings/ratings.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PlantsSuppliersMapComponent } from './plants-suppliers-map/plants-suppliers-map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { EmailReportGenerateComponent } from './email-report-generate/email-report-generate.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


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
    PlantsComponent,
    LanguageChangerComponent,
    SystemConfigurationsComponent,
    ConfigValuesTablePipe,
    RatingsComponent,
    PlantsSuppliersMapComponent,
    EmailReportGenerateComponent,
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
    MatDividerModule,
    MatExpansionModule,
    MatTooltipModule,
    NgxChartsModule,
    MatProgressBarModule,
    LeafletModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [HttpHeadersService, DeviationsComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
