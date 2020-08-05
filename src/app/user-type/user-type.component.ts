import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChargingService } from '../charging.service';

@Component({
  selector: 'app-user-type',
  templateUrl: './user-type.component.html',
  styleUrls: ['./user-type.component.css']
})
export class UserTypeComponent implements OnInit {

  isLoggedIn$: Observable<boolean>; 
  constructor(private chargingService : ChargingService) { }

  ngOnInit() {
    this.isLoggedIn$ = this.chargingService.isLoggedIn;
  }

  onLogout(){
    this.chargingService.logout();              
  }

}
