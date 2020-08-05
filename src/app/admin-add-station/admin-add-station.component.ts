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
  
//when will this city and campuslocation value get updated? 
  error:string;

  constructor(private chargingService:ChargingService,private router: Router) { }

  ngOnInit() {
  }

  addStation(stationForm:NgForm) {
    let city = stationForm.value.city;
    let campusLocation = stationForm.value.campusLocation;
    this.chargingService.addStation(city,campusLocation).subscribe((station)=> {
      console.log("Station added successfully");
     
    }, (stationError)=> {
      alert(stationError.error.message);
    })
  }

 
}
