import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChargingService } from '../charging.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-type',
  templateUrl: './user-type.component.html',
  styleUrls: ['./user-type.component.css']
})
export class UserTypeComponent implements OnInit {

  isLoggedIn$: Observable<boolean>; 
  constructor(private chargingService : ChargingService, private router : Router) { }

  ngOnInit() {
    this.isLoggedIn$ = this.chargingService.isLoggedIn;
  }

  onLogout(){
    this.chargingService.logout();              
  }

  showProfile() {
    if(this.chargingService.loggedInUser.isAdmin) {
      this.router.navigate(['/adminhomepage/profile'])
    } else {
      this.router.navigate(['/userhomepage/profile'])
    }
  }
}
