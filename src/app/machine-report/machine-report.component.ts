import { Component, OnInit } from '@angular/core';
import {Station} from '../model/station';
import { MachineReport } from '../model/machineReport';
import { DatePipe } from '@angular/common';
import { ChargingService } from '../charging.service';
import { Label, SingleDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';
@Component({
  selector: 'app-machine-report',
  templateUrl: './machine-report.component.html',
  styleUrls: ['./machine-report.component.css']
})
export class MachineReportComponent implements OnInit {


  stations: Station[] = [];
  selectedStation : Station;
  minFromDate = new Date('2020-01-01');
  minToDate = this.minFromDate;
  selectedFromDate : Date;
  selectedToDate : Date;
  machineReports : MachineReport[];
  dataLoaded = false;
  
  public doughnutChartLabels: Label[] = ['Free Hours', 'Booking Hours', 'Booking Cancelled Hours', 'Booking Rescheduled Hours'];

  public doughnutChartList : SingleDataSet[] = [];
  public doughnutChartType: ChartType = 'doughnut';

  constructor(private chargingService: ChargingService, private datePipe : DatePipe) { }

  ngOnInit(): void {
    this.chargingService.getAllStations().subscribe((stations) => {
      this.stations = stations;
      this.selectedStation= stations[0];
    }, (stationError) => {
      alert(stationError.error.message);
    })
  }

  onFromDateChange(selectedDate : Date) {
    this.selectedFromDate = selectedDate;
    this.minToDate = this.selectedFromDate;
    
    if(this.selectedToDate != undefined && (this.selectedToDate < this.selectedFromDate)) {
         this.selectedToDate = undefined;
    }
    if(this.selectedFromDate != undefined && this.selectedToDate != undefined) {
     this.dataLoaded = false;
     this.generateMachinesReportOfStation();
     
   }
 }

 onToDateChange(selectedDate : Date) {
   this.selectedToDate = selectedDate;
   if(this.selectedFromDate != undefined && this.selectedToDate != undefined) {
     this.dataLoaded = false;
     this.generateMachinesReportOfStation();
    
   }
}

stationSelectionListClicked(selectedStation : Station) {
   
  this.selectedStation = selectedStation;
  if(this.selectedFromDate != undefined && this.selectedToDate != undefined) {
    this.dataLoaded = false;
    this.generateMachinesReportOfStation();
   
  }
}

generateMachinesReportOfStation() {
   
  let transformedFromDate  = this.datePipe.transform(this.selectedFromDate ,this.chargingService.dateFormatter);

  let transformedToDate = this.datePipe.transform(this.selectedToDate ,this.chargingService.dateFormatter);
  
  this.chargingService.getMachinesReportOfStation(this.selectedStation.stationId,transformedFromDate,transformedToDate).subscribe((machineReports) => {
      this.machineReports = machineReports;
      this.dataLoaded = true;
      this.doughnutChartList = [];
 
      machineReports.forEach(report=> {
       let doughnutChartData = [];
       doughnutChartData.push(report.freeMins / 60);
       doughnutChartData.push(report.bookingMins / 60);
       doughnutChartData.push(report.bookingCancelledMins / 60);
       doughnutChartData.push(report.bookingRescheduledMins / 60); 
       this.doughnutChartList.push(doughnutChartData);
        
      });
      
  },(machineReportError)=> {
    this.dataLoaded = true;
    alert(machineReportError.error.message);
  })
}

}
