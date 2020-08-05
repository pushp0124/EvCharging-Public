import { Component, OnInit } from '@angular/core';
import { Station } from '../model/station';
import { MachineType } from '../model/machineType';
import { MachineDetails } from '../model/machineDetails';
import { MachineDetailKey } from '../model/machineDetailKey';
import { MachineDetailValue } from '../model/machineDetailValue';
import { ChargingService } from '../charging.service';
import { Router } from '@angular/router';
import { Machine } from '../model/machine';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatRadioChange } from '@angular/material/radio';
import { SlotDuration } from '../model/slotDuration';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin-view-slot',
  templateUrl: './admin-view-slot.component.html',
  styleUrls: ['./admin-view-slot.component.css']
})
export class AdminViewSlotComponent implements OnInit {

  stations: Station[] = [];
  machineTypes = [MachineType.LEVEL1,MachineType.LEVEL2,MachineType.LEVEL3];
  machineSlots = [SlotDuration.FIFTEEN, SlotDuration.THIRTY, SlotDuration.SIXTY];
  selectedMachineType : MachineType = this.machineTypes[0];
  selectedMachineSlot : SlotDuration = this.machineSlots[0];
  selectedStation : Station;
  nextDate: Date;
  details:  MachineDetails = new MachineDetails();
  machineDetails : Map<MachineDetailKey,MachineDetailValue[]> = new Map<MachineDetailKey,MachineDetailValue[]>();
  loggedInEmployeeId : number;
  constructor(private chargingService: ChargingService, private router: Router, private datePipe : DatePipe) { }

  sixtyMinutesMachineDetailKey :  MachineDetailKey[] = [];
  thirtyMinutesMachineDetailKey : MachineDetailKey[] = [];
  fifteenMinutesMachineDetailKey : MachineDetailKey[] = [];

  selectedDate: Date;
  selectedStartTime : string;
  selectedMachine: Machine;
  dataLoaded = false;

  selectedViewType: number;
  viewTypes: string[] = ['By Machine Type(s)', 'By Machine Slot(s)'];

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

   ngOnInit() {

      //this.loggedInEmployeeId =   this.chargingService.loggedInUser.employeeId;
      this.loggedInEmployeeId = 1;
      this.selectedViewType = 0;
      this.chargingService.getAllStations().subscribe((stations) => {
      this.stations = stations;
      this.selectedStation= stations[0];
      this.chargingService.getNextAvailableBookingDate(this.selectedMachineType,this.selectedStation.stationId).subscribe((nextDate) => {
        this.nextDate = nextDate;
        console.log(this.nextDate);
        this.getMachineDetail();
      },(dateError) => {
        alert(dateError.error.message);
      })

     }, (stationError) => {
       alert(stationError.error.message);
     })
      
      
  }

  getMachineDetail() {
    this.machineDetails.clear();
    this.dataLoaded = false;
    this.fifteenMinutesMachineDetailKey = [];
    this.sixtyMinutesMachineDetailKey = [];
    this.thirtyMinutesMachineDetailKey = [];
    let transformedDate  = this.datePipe.transform(this.selectedDate ,this.chargingService.dateFormatter);
    this.chargingService.getMachineBookingDetailByType(transformedDate,this.selectedMachineType,this.selectedStation.stationId).subscribe((object) => {
        
         
      Object.keys(object.machineDetails).forEach((key) => {
      
        var machineKey: MachineDetailKey = <MachineDetailKey>JSON.parse(key);
        
        this.machineDetails.set(machineKey, object.machineDetails[key]);
       
      });
  
      console.log(this.machineDetails);
      let keysArray =  Array.from(this.machineDetails.keys());
      
      keysArray.forEach((machineDetailKey) => {
        if(machineDetailKey.slotDuration == SlotDuration.FIFTEEN) {
          this.fifteenMinutesMachineDetailKey.push(machineDetailKey);
        } else if(machineDetailKey.slotDuration == SlotDuration.THIRTY) {
          this.thirtyMinutesMachineDetailKey.push(machineDetailKey);
        } else {
          this.sixtyMinutesMachineDetailKey.push(machineDetailKey);
        }
        console.log(machineDetailKey.slotDuration);
      })
      
      this.fifteenMinutesMachineDetailKey =  this.sortArrayBasedOnTime(this.fifteenMinutesMachineDetailKey);
      this.thirtyMinutesMachineDetailKey = this.sortArrayBasedOnTime(this.thirtyMinutesMachineDetailKey);
      this.sixtyMinutesMachineDetailKey = this.sortArrayBasedOnTime(this.sixtyMinutesMachineDetailKey);

      this.dataLoaded = true;
    },(detailError) => {
      alert(detailError.error.message);
      this.dataLoaded = true;
    })
  }
  sortArrayBasedOnTime(keyArray : MachineDetailKey[]) : MachineDetailKey[] {

     return keyArray.sort((key1, key2) => {
        if(key1.startTime < key2.startTime) {
          return -1;
        } else if(key1.startTime > key2.startTime){
          return 1;
        } 
        return 0;
    })

  }

  level1MachinesDetailKey : MachineDetailKey[] = [];
  level2MachinesDetailKey : MachineDetailKey[] = [];
  level3MachinesDetailKey : MachineDetailKey[] = [];
 
  machineDetailsBySlot : Map<MachineDetailKey,MachineDetailValue[]> = new Map<MachineDetailKey,MachineDetailValue[]>();

  getMachinetailBySlot() {
    this.machineDetailsBySlot.clear();
    this.dataLoaded = false;
    this.level1MachinesDetailKey = [];
    this.level2MachinesDetailKey = [];
    this.level3MachinesDetailKey = [];
    this.chargingService.getMachineBookingDetailBySlot(this.nextDate,this.selectedMachineSlot,this.selectedStation.stationId).subscribe((object) => {
        
         
      Object.keys(object.machineDetails).forEach((key) => {
      
        var machineKey: MachineDetailKey = <MachineDetailKey>JSON.parse(key);
        
        this.machineDetailsBySlot.set(machineKey, object.machineDetails[key]);
       
      });
  
      console.log(this.machineDetailsBySlot);
      let keysArray =  Array.from(this.machineDetailsBySlot.keys());
      
      keysArray.forEach((machineDetailKey) => {
        if(machineDetailKey.machineType == MachineType.LEVEL1) {
          this.level1MachinesDetailKey.push(machineDetailKey);
        } else if(machineDetailKey.machineType == MachineType.LEVEL2) {
          this.level2MachinesDetailKey.push(machineDetailKey);
        } else {
          this.level3MachinesDetailKey.push(machineDetailKey);
        }
        console.log(machineDetailKey.slotDuration);
      })
      
      this.level1MachinesDetailKey =  this.sortArrayBasedOnTime(this.level1MachinesDetailKey);
      this.level2MachinesDetailKey = this.sortArrayBasedOnTime(this.level2MachinesDetailKey);
      this.level3MachinesDetailKey = this.sortArrayBasedOnTime(this.level3MachinesDetailKey);

      this.dataLoaded = true;
    },(detailError) => {
      alert(detailError.error.message);
      this.dataLoaded = true;
    })
  }

  dateSelectionListClicked(selectedDate :Date) {
    
      // this.selectedDate = selectedDate;
      // this.getMachineDetail();
    
     
  }

  radioChange($event: MatRadioChange) {
    if($event.value == 0 && this.machineDetails.size == 0) {
       this.getMachineDetail();
    } else if($event.value == 1 && this.machineDetailsBySlot.size == 0) {
        this.getMachinetailBySlot();
    }

    
}
  stationSelectionListClicked(selectedStation : Station) {
   
        this.selectedStation = selectedStation;
        this.getMachineDetail(); 
    
  }

  levelSelectionListClicked(selectedMachineType : MachineType) {
    

 
        this.selectedMachineType = selectedMachineType;
        this.getMachineDetail();
        console.log("Hello", this.selectedMachineType, selectedMachineType);
        
 

  }

  slotSelectionListClicked(selectedMachineSlotDuration : SlotDuration) {
    this.selectedMachineSlot = selectedMachineSlotDuration;
    this.getMachinetailBySlot();

}

  machineButtonClicked(selectedStartTime: string, selectedMachine : MachineDetailKey) {
     this.selectedStartTime = selectedStartTime;
    //  this.selectedMachine = selectedMachine; 
    //  if(this.selectedMachine.machineStatus == MachineDetailStatus.BOOKED) {

    //  }
  }

  openSnackBar() {
    // this._snackBar.open('Cannonball!!', 'End now', {
    //   duration: 500,
    //   horizontalPosition: this.horizontalPosition,
    //   verticalPosition: this.verticalPosition,
    // });
  }
  
}
