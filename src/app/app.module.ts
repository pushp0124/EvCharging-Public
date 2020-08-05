import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';

//Forms

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Anguar material
import { MatCardModule, MatButtonModule, MatSelectModule, MatProgressBarModule, MatRadioModule, MatDatepickerModule, MatInputModule, MatTabsModule, MatTableModule, MatPaginatorModule, MatNativeDateModule, MatGridListModule, MatStepperModule, MatIconModule, MatDialogModule, MatProgressSpinnerModule } from '@angular/material';
import { DatePipe } from '@angular/common';


//Charts
import { ChartsModule } from 'ng2-charts';


//Components
import { DetailDialogComponent } from './detail-dialog/detail-dialog.component';
import { UserETicketComponent } from './user-e-ticket/user-e-ticket.component';
import { HomeComponent } from './home/home.component';
import { UserTypeComponent } from './user-type/user-type.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AboutComponent } from './about/about.component';
import { UserBookSlotComponent } from './user-book-slot/user-book-slot.component';
import { UserMyBookingsComponent } from './user-my-bookings/user-my-bookings.component';
import { AdminViewSlotComponent } from './admin-view-slot/admin-view-slot.component';
import { AdminGenerateReportComponent } from './admin-generate-report/admin-generate-report.component';
import { AdminAddMachineComponent } from './admin-add-machine/admin-add-machine.component';
import { AdminRemoveMachineComponent } from './admin-remove-machine/admin-remove-machine.component';
import { UserHomePageComponent } from './user-home-page/user-home-page.component';
import { AdminHomePageComponent } from './admin-home-page/admin-home-page.component';
import { AdminAddStationComponent } from './admin-add-station/admin-add-station.component';
import { MachineReportComponent } from './machine-report/machine-report.component';
import { UserBookingReportComponent } from './user-booking-report/user-booking-report.component';
import { AdminStationReportComponent } from './admin-station-report/admin-station-report.component';
import { AdminHomeChildComponent } from './admin-home-child/admin-home-child.component';
import { UserHomeChildComponent } from './user-home-child/user-home-child.component';
import { AdminEmployeeBookingReportComponent } from './admin-employee-booking-report/admin-employee-booking-report.component';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';
@NgModule({
  entryComponents : [DetailDialogComponent, UserETicketComponent],
  declarations: [
    AppComponent,
    HomeComponent,
    UserTypeComponent,
    UserLoginComponent,
    SignUpComponent,
    PageNotFoundComponent,
    AboutComponent,
    UserBookSlotComponent,
    UserMyBookingsComponent,
    UserETicketComponent,
    AdminViewSlotComponent,
    AdminGenerateReportComponent,
    AdminAddMachineComponent,
    AdminRemoveMachineComponent,
    UserHomePageComponent,
    AdminHomePageComponent,
    AdminAddStationComponent,
    UserHomeChildComponent,
    AdminHomeChildComponent,
    AdminStationReportComponent,
    UserBookingReportComponent,
    DetailDialogComponent,
    MachineReportComponent,
    AdminEmployeeBookingReportComponent,
    EmployeeProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatProgressBarModule,
    BrowserAnimationsModule,
    MatRadioModule,
    MatDatepickerModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    ChartsModule,
    MatNativeDateModule,
    MatGridListModule,
    MatStepperModule,
    MatIconModule,
    MatDialogModule,
    MatProgressSpinnerModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
