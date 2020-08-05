import { Component, OnInit, ViewChild } from '@angular/core';
import { Station } from '../model/station';
import { MachineType } from '../model/machineType';
import { ChargingService } from '../charging.service';
import { Machine } from '../model/machine';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import { MatTableDataSource } from '@angular/material/table';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { DatePipe } from '@angular/common';
import { Booking } from '../model/booking';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-admin-remove-machine',
  templateUrl: './admin-remove-machine.component.html',
  styleUrls: ['./admin-remove-machine.component.css']
})
export class AdminRemoveMachineComponent implements OnInit {

  stations: Station[] = [];
  machineTypes = [MachineType.LEVEL1,MachineType.LEVEL2,MachineType.LEVEL3];
  selectedMachineType : MachineType = this.machineTypes[0];
  selectedStation : Station;
  machines : Machine[];
  selectedViewType : number = 1;
  displayedColumns: string[] = ['machineId','machineType','city','campus','startTime','endTime','startDate'];
  dataSource : MatTableDataSource<Machine>;

  selectedMachine : Machine;
  bookings : Booking[];

  public barChartOptions: ChartOptions = {
  
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{
      ticks : {
        beginAtZero: true,
        callback: function(value : number) {if (value % 1 === 0) {return value;}}
      }
    }] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
        formatter: function(value, context) {
          if(value == 0)
              return "";
      }
      }
    },
    
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { data: [], 
      label: 'Bookings Data', 
      barThickness: 60,
      barPercentage: 1.0},
    
  ];

  barChartColors: Color[] = [
    { backgroundColor: '#24d2b5' }
  ]



  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(private chargingService: ChargingService, private datePipe : DatePipe) { }

  ngOnInit() {
    this.chargingService.getAllStations().subscribe((stations) => {
      this.stations = stations;
      this.selectedStation= stations[0];
      this.getMachinesOfStation();
    })
  }
 
  stationSelectionListClicked(selectedStation : Station) {
   this.selectedStation = selectedStation; 
   this.getMachinesOfStation();
  }
  levelSelectionListClicked(selectedMachineType : MachineType) {
    this.selectedMachineType = selectedMachineType;
  }

  getMachinesOfStation() {
    this.chargingService.getMachinesofStation(this.selectedStation.stationId).subscribe((machines) => {
      console.log(machines); 
      this.machines = machines;
      this.dataSource = new MatTableDataSource(this.machines)
    })
  }

  generateLabelsAndSetData(fromDate : Date, toDate : Date) {
  
    let date = fromDate;
    this.barChartLabels = [];
    this.barChartData = [{ data: [], 
      label: 'Bookings Data', 
      barThickness: 60,
      barPercentage: 1.0},
    
  ];
    for (date ; date <= toDate; date.setDate(date.getDate() + 1)) {
        let transformedDate  = this.datePipe.transform(new Date(date) ,this.chargingService.dateFormatter);
        this.barChartLabels.push(transformedDate);
        this.barChartData[0].data.push(0);
    }
  }
  machineRowClicked(clickedMachine : Machine) {
     this.selectedMachine = clickedMachine;
     let fromDate = new Date();
     let toDate = new Date('2020-08-01');
    let transformedFromDate  = this.datePipe.transform(fromDate ,this.chargingService.dateFormatter);
    let transformedToDate = this.datePipe.transform(toDate ,this.chargingService.dateFormatter);
   
    this.generateLabelsAndSetData(fromDate,toDate);
     console.log(transformedFromDate, transformedToDate)
     this.chargingService.generateMachineBookingsReport(transformedFromDate,transformedToDate,this.selectedMachine.machineId).subscribe((bookings) => {
          this.bookings = bookings;
          var data = this.barChartData[0].data;
          this.bookings.forEach((booking) => {
            var diff = Math.abs(new Date(booking.bookedDate).getTime() - new Date(transformedFromDate).getTime());

            var diffDays = Math.ceil(diff / (1000 * 3600 * 24)); 
            console.log(diffDays);
            data[diffDays] =  +data[diffDays] + 1;
          })
          this.barChartData[0].data = data;
          this.barChartData[0].data.push(0)
         
         
     })
  }





  onSelect(event) {
    console.log(event);
    }
  
  
  
    // events
    public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
      console.log(event, active);
    }
  
    public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
      console.log(event, active);
    }
  
    public randomize(): void {
     
    }

  


}