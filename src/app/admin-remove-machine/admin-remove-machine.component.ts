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
import { BookingStatus } from '../model/bookingStatus';
import { MachineStatus } from '../model/machineStatus';
import { SlotDuration } from '../model/slotDuration';

@Component({
  selector: 'app-admin-remove-machine',
  templateUrl: './admin-remove-machine.component.html',
  styleUrls: ['./admin-remove-machine.component.css']
})
export class AdminRemoveMachineComponent implements OnInit {

  stations: Station[] = [];
  machineTypes = [MachineType.LEVEL1, MachineType.LEVEL2, MachineType.LEVEL3];
  selectedMachineType: MachineType = this.machineTypes[0];
  selectedStation: Station;
  machines: Machine[];
  selectedViewType: number = 1;
  displayedColumns: string[] = ['machineId', 'machineType', 'city', 'campus', 'startTime', 'endTime', 'startDate'];
  dataSource: MatTableDataSource<Machine>;

  selectedMachine: Machine;
  bookings: Booking[];

  dataLoaded = false;
  public barChartOptions: ChartOptions = {

    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      xAxes: [{}], yAxes: [{
        ticks: {
          beginAtZero: true,
          callback: function (value: number) { if (value % 1 === 0) { return value; } }
        }
      }]
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
        formatter: function (value, context) {
          if (value == 0)
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
    {
      data: [],
      label: 'Bookings Data',
      barThickness: 60,
      barPercentage: 1.0
    },

  ];

  barChartColors: Color[] = [
    { backgroundColor: '#24d2b5' }
  ]



  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(private chargingService: ChargingService, private datePipe: DatePipe) { }

  ngOnInit() {
    this.chargingService.getAllStations().subscribe((stations) => {
      this.stations = stations;
      this.selectedStation = stations[0];
      this.getMachinesOfStation();
    })
  }

  stationSelectionListClicked(selectedStation: Station) {
    this.selectedStation = selectedStation;
    this.getMachinesOfStation();
  }
  levelSelectionListClicked(selectedMachineType: MachineType) {
    this.selectedMachineType = selectedMachineType;
  }

  getMachinesOfStation() {
    this.chargingService.getMachinesofStation(this.selectedStation.stationId).subscribe((machines) => {
      console.log(machines);
      this.machines = machines;
      this.dataSource = new MatTableDataSource(this.machines)
    })
  }


  machineRowClicked(clickedMachine: Machine) {
    this.dataLoaded = false
    this.selectedMachine = clickedMachine;
    
    if(this.selectedMachine.machineStatus == MachineStatus.REMOVED) {
      return
    }

    this.initialiseModifyMachine()
    let fromDate = new Date();
    let toDate = new Date(fromDate.getFullYear() + 50, fromDate.getMonth(), fromDate.getDate())
    let transformedFromDate = this.datePipe.transform(fromDate, this.chargingService.dateFormatter);
    let transformedToDate = this.datePipe.transform(toDate, this.chargingService.dateFormatter);

    this.barChartLabels = [];
    this.barChartData[0].data = []

    

    this.chargingService.generateMachineBookingsReport(transformedFromDate, transformedToDate, this.selectedMachine.machineId).subscribe((bookings) => {

      this.bookings = this.sortAndFilterBookings(bookings);

      
      var data;
      console.log(this.bookings)
      this.bookings.forEach(booking => {

        console.log(booking.status)
        let transformedDate = this.datePipe.transform(booking.bookedDate, this.chargingService.dateFormatter);
        let index = this.barChartLabels.findIndex(x => {
          return x == transformedDate
        })
        if (index == -1) {
          this.barChartLabels.push(transformedDate);
          this.barChartData[0].data.push(0);
          index = this.barChartLabels.length - 1;
        }
        data = this.barChartData[0].data;
        data[index] = +data[index] + 1;
      })
      this.barChartData[0].data = data
      this.dataLoaded = true
    })
  }

  sortAndFilterBookings(bookings: Booking[]) {
    let filteredArray = bookings.filter((booking) => {
      return booking.status == BookingStatus.BOOKED;
    })

    let sortedAndFilteredArray = filteredArray.sort((booking1, booking2) => {
      if (booking1.bookedDate < booking2.bookedDate) {
        return -1;
      } else if (booking1.bookedDate > booking2.bookedDate) {
        return 1;
      }
      return 0;
    })
    return sortedAndFilteredArray;
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








  //modify machine
  startTime: string[] = [];
  endTime: string[] = [];

  slotDurations = [SlotDuration.SIXTY, SlotDuration.THIRTY, SlotDuration.FIFTEEN];
  //initialise
  modifySelectedStation: Station;
  selectedStartDate: Date;
  modifySelectedMachineType: MachineType;
  selectedMachineSlot: SlotDuration;
  selectedStartTime: string;
  selectedEndTime: string;
  modifySelectedMachineStatus: MachineStatus;

  minDate = new Date();

  errorMessage: string;
  successMessage: string;
  infoMessage: string;

  fifteenMinsStartTime: string[];
  fifteenMinsEndTime: string[];

  thirtyMinsStartTime: string[];
  thirtyMinsEndTime: string[];

  sixtyMinsStartTime: string[];
  sixtyMinsEndTime: string[];

  startEndTimeIndex = 1;

  initialiseModifyMachine() {

    console.log(this.selectedMachine)
    this.modifySelectedStation = this.selectedMachine.machineStation;
    this.selectedStartDate = this.selectedMachine.startingDate;
    this.modifySelectedMachineType = this.selectedMachine.machineType
    this.selectedMachineSlot = this.selectedMachine.slotDuration
    this.modifySelectedMachineStatus = this.selectedMachine.machineStatus;
    //stat time, and end time not initialised 
    this.initialiseTime();
    this.selectSlotDuration()
  

  }

  modifyMachine() {

    this.selectedMachine.slotDuration = this.selectedMachineSlot
    this.selectedMachine.machineType = this.modifySelectedMachineType
    this.selectedMachine.startingDate = this.selectedStartDate
    this.selectedMachine.startTime = this.selectedStartTime
    this.selectedMachine.endTime = this.selectedEndTime
    this.chargingService.modifyMachine(this.selectedMachine).subscribe((machines) => {
      this.successMessage = "Machine Modified Successfully"
    }, (machineModifyError) => {
      this.errorMessage = machineModifyError.error.message;
    })
  }



  selectMachineType(machineType: MachineType) {
    this.selectedMachineType = machineType;
  }
  selectSlotDuration() {


    console.log("Hello" + this.selectedMachineSlot)
    if (this.selectedMachineSlot == SlotDuration.SIXTY) {
      this.selectedStartTime = this.sixtyMinsStartTime[0];
      this.selectedEndTime = this.sixtyMinsEndTime[this.sixtyMinsEndTime.length - 1];

    } else if (this.selectedMachineSlot == SlotDuration.THIRTY) {
      this.selectedStartTime = this.thirtyMinsStartTime[0];
      this.selectedEndTime = this.thirtyMinsEndTime[this.thirtyMinsEndTime.length - 1];

    } else {
      this.selectedStartTime = this.fifteenMinsStartTime[0];
      this.selectedEndTime = this.fifteenMinsEndTime[this.fifteenMinsEndTime.length - 1];

    }

  }

  initialiseTime() {

    this.thirtyMinsStartTime = [];
    this.thirtyMinsEndTime = [];

    for (let hours = 0; hours < 24; hours++) {
      for (let mins = 0; mins < 60; mins += 30) {
        this.thirtyMinsStartTime.push(this.convertNumberToTwoDigit(hours) + ":" + this.convertNumberToTwoDigit(mins));
        this.thirtyMinsEndTime.push(this.convertNumberToTwoDigit(hours) + ":" + this.convertNumberToTwoDigit(mins));

      }
    }

    this.sixtyMinsStartTime = [];
    this.sixtyMinsEndTime = [];

    for (let hours = 0; hours < 24; hours++) {
      this.sixtyMinsStartTime.push(this.convertNumberToTwoDigit(hours) + ":" + this.convertNumberToTwoDigit(0));
      this.sixtyMinsEndTime.push(this.convertNumberToTwoDigit(hours) + ":" + this.convertNumberToTwoDigit(0));
    }


    this.fifteenMinsStartTime = [];
    this.fifteenMinsEndTime = [];
    for (let hours = 0; hours < 24; hours++) {
      for (let mins = 0; mins < 60; mins += 15) {
        //two zeros are to be done 4:00
        this.fifteenMinsStartTime.push(this.convertNumberToTwoDigit(hours) + ":" + this.convertNumberToTwoDigit(mins));
        this.fifteenMinsEndTime.push(this.convertNumberToTwoDigit(hours) + ":" + this.convertNumberToTwoDigit(mins));

      }
    }
  }

  convertNumberToTwoDigit(digit: number) {
    //check if number is already of two digit
    let numberInString: string = digit.toString();
    if (numberInString.length >= 2) {
      return digit.toString();
    } else {
      //append zero in the beginning
      return ("0" + numberInString);
    }

  }

  startTimeSelected() {

    let startTimeSelectedIndex = 0;
    if (this.selectedMachineSlot == SlotDuration.SIXTY) {
      startTimeSelectedIndex = this.sixtyMinsStartTime.findIndex((time) => {
        return this.selectedStartTime == time;
      })


    } else if (this.selectedMachineSlot == SlotDuration.THIRTY) {
      startTimeSelectedIndex = this.thirtyMinsStartTime.findIndex((time) => {
        return this.selectedStartTime == time;
      })
    } else {
      startTimeSelectedIndex = this.fifteenMinsStartTime.findIndex((time) => {
        return this.selectedStartTime == time;
      })
    }
    this.startEndTimeIndex = startTimeSelectedIndex + 1;
  }

  endTimeSelected() {
    // this.selectedEndTime = this.endTime[endTimeSeletedIndex];

  }

  onStartingDateChange() {
    if (this.selectedStartDate > this.minDate) {
      this.infoMessage = "Note that the machine will be in halt machine automatically and can't be booked, if machine starting date is later than the current date. We will resume the machine from the midnight hours of the " + this.selectedStartDate + " date. For machine to be in active state specify today's date only."
      this.modifySelectedMachineStatus = MachineStatus.HALTED
    } else {
      this.infoMessage = undefined;
    }
  }


  errorClosed() {
    this.errorMessage = undefined;
  }

  successClosed() {
    this.successMessage = undefined;
  }

  infoClosed() {
    this.infoMessage = undefined;
  }


}