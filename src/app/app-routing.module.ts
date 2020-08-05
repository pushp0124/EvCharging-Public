import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Components
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
import { AuthGuard } from './auth-guard.guard';
const routes: Routes = [

  { path: 'usertype', component: UserTypeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'userlogin', component: UserLoginComponent },
  { path: 'userhomepage',
    component: UserHomePageComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: UserHomeChildComponent },
      { path: 'userbookslot', component: UserBookSlotComponent },
      { path: 'userbookingsreport', component: UserBookingReportComponent },
      { path: 'usermybookings', component: UserMyBookingsComponent }
    ]
  },
  {
    path: 'adminhomepage',
    component: AdminHomePageComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: AdminHomeChildComponent },
      { path: 'adminaddmachine', component: AdminAddMachineComponent },
      { path: 'adminaddstation', component: AdminAddStationComponent },
      { path: 'adminstationsreport', component: AdminStationReportComponent },
      { path: 'adminmachinesreport', component: MachineReportComponent },
      { path: 'admingeneratereport', component: AdminGenerateReportComponent },
      { path: 'adminremovemachine', component: AdminRemoveMachineComponent },
      { path: 'adminviewslot', component: AdminViewSlotComponent },

    ]

  },
  { path : 'encrypted/adminsignup' ,component : SignUpComponent},
  { path: 'signup', component: SignUpComponent },
  { path: '', component: HomeComponent },
  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
