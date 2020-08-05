import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MachineDetailValue } from '../model/machineDetailValue';
import { MachineStatus } from '../model/machineStatus';
import { MachineDetailStatus } from '../model/machineDetailStatus';

@Component({
  selector: 'app-detail-dialog',
  templateUrl: './detail-dialog.component.html',
  styleUrls: ['./detail-dialog.component.css']
})
export class DetailDialogComponent implements OnInit {

  message : string;
  actions : string[] = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data : any) { }

  ngOnInit(): void {
    if(this.data.selectedMachineDetailValue.machineCurrentStatus == MachineStatus.HALTED) {
      this.message = "The machine will be active from" + this.data.selectedMachineDetailValue.machineStartingDate + " , we advise you to visit us at 00:00 on " + this.data.selectedMachineDetailValue.machineStartingDate + " for booking";
    } else if(this.data.selectedMachineDetailValue.machineCurrentStatus == MachineStatus.ACTIVE) {
       if(this.data.selectedMachineDetailValue.status == MachineDetailStatus.BOOKED) {
         this.message = "The machine is booked by employee with employee id" + this.data.selectedMachineDetailValue.bookedByEmployeeId;
       } else {
          this.message = "Book the selected machine";  
       }
    }
    this.actions = this.data.actions;
  }


}
