import { Component, OnInit } from '@angular/core';
import { Employee } from '../model/employee';
import { ChargingService } from '../charging.service';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css']
})
export class EmployeeProfileComponent implements OnInit {

  employee : Employee;
  constructor(private chargingService : ChargingService) { }

  ngOnInit() {
    this.employee =  this.chargingService.loggedInUser
  }

}
