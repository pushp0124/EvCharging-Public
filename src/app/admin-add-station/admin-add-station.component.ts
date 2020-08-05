import { Station } from './../model/station';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ChargingService } from '../charging.service';

@Component({
  selector: 'app-admin-add-station',
  templateUrl: './admin-add-station.component.html',
  styleUrls: ['./admin-add-station.component.css']
})
export class AdminAddStationComponent implements OnInit {
  
  errorMessage : string;

  successMessage : string;
  constructor(private chargingService:ChargingService,private router: Router) { }

  ngOnInit() {
  }

  addStation(stationForm:NgForm) {
    let city = stationForm.value.city;
    let campusLocation = stationForm.value.campusLocation;
    this.chargingService.addStation(city,campusLocation).subscribe((station)=> {
      this.successMessage = "Station added successfully";
    }, (stationError)=> {
       this.errorMessage = stationError.error.message;
    })
  }

  errorClosed() {
    this.errorMessage = undefined;
  }

  successClosed() {
    this.successMessage = undefined;
  }

 
}
