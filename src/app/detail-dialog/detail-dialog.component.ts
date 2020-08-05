import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MachineDetailValue } from '../model/machineDetailValue';
import { MachineStatus } from '../model/machineStatus';
import { MachineDetailStatus } from '../model/machineDetailStatus';
import { DialogModel, Action } from '../model/dialog-model';

@Component({
  selector: 'app-detail-dialog',
  templateUrl: './detail-dialog.component.html',
  styleUrls: ['./detail-dialog.component.css']
})
export class DetailDialogComponent implements OnInit {

  actions : Action[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data : DialogModel) { }

  ngOnInit(): void {
     this.actions = this.data.actions;
     console.log(this.data.actions);
  }


}
