import { Component, OnInit, Inject } from '@angular/core';
import { ChargingService } from '../charging.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MachineType } from '../model/machineType';
import { MachineDetails } from '../model/machineDetails';
import { Station } from '../model/station';
import { MachineDetailKey } from '../model/machineDetailKey';
import { SlotDuration } from '../model/slotDuration';
import { MachineDetailValue } from '../model/machineDetailValue';
import { MachineStatus } from '../model/machineStatus';
import { MachineDetailStatus } from '../model/machineDetailStatus';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { DetailDialogComponent } from '../detail-dialog/detail-dialog.component';
import { Booking } from '../model/booking';
import { UserETicketComponent } from '../user-e-ticket/user-e-ticket.component';
import { DialogModel, Action } from '../model/dialog-model';
@Component({
  selector: 'app-user-book-slot',
  templateUrl: './user-book-slot.component.html',
  styleUrls: ['./user-book-slot.component.css'],
})
export class UserBookSlotComponent implements OnInit {

  stations: Station[] = [];
  machineTypes = [MachineType.LEVEL1, MachineType.LEVEL2, MachineType.LEVEL3];

  selectedMachineType: MachineType = this.machineTypes[0];
  selectedStation: Station;
  nextDate: Date;
  details: MachineDetails = new MachineDetails();
  machineDetails: Map<MachineDetailKey, MachineDetailValue[]> = new Map<MachineDetailKey, MachineDetailValue[]>();

  constructor(private chargingService: ChargingService, private route: ActivatedRoute, private router: Router, private datePipe: DatePipe, private matDialog: MatDialog) { }

  sixtyMinutesMachineDetailKey: MachineDetailKey[] = [];
  thirtyMinutesMachineDetailKey: MachineDetailKey[] = [];
  fifteenMinutesMachineDetailKey: MachineDetailKey[] = [];

  selectedDate: Date;
  selectedStartTime: string;
  selectedMachineValue: MachineDetailValue;
  dataLoaded = false;

  booking: Booking;
  minDate = new Date();

  errorMessage: string;
  successMessage: string;

  ngOnInit() {


    this.chargingService.getAllStations().subscribe((stations) => {
      this.stations = stations;
      this.selectedStation = stations[0];
      this.chargingService.getNextAvailableBookingDate(this.selectedMachineType, this.selectedStation.stationId).subscribe((nextDate) => {
        this.nextDate = nextDate;
        this.dataLoaded = true;
      }, (dateError) => {
        this.dataLoaded = true;
        this.errorMessage = dateError.error.message;
      })

    }, (stationError) => {
      this.errorMessage = stationError.error.message;
    })


  }

  getMachineDetail() {
    this.machineDetails.clear();
    this.dataLoaded = false;
    this.fifteenMinutesMachineDetailKey = [];
    this.sixtyMinutesMachineDetailKey = [];
    this.thirtyMinutesMachineDetailKey = [];
    let transformedDate = this.datePipe.transform(this.selectedDate, this.chargingService.dateFormatter);
    this.chargingService.getMachineBookingDetailByType(transformedDate, this.selectedMachineType, this.selectedStation.stationId).subscribe((object) => {


      Object.keys(object.machineDetails).forEach((key) => {

        var machineKey: MachineDetailKey = <MachineDetailKey>JSON.parse(key);

        this.machineDetails.set(machineKey, object.machineDetails[key]);

      });

      console.log(this.machineDetails, object);
      let keysArray = Array.from(this.machineDetails.keys());

      keysArray.forEach((machineDetailKey) => {
        if (machineDetailKey.slotDuration == SlotDuration.FIFTEEN) {
          this.fifteenMinutesMachineDetailKey.push(machineDetailKey);
        } else if (machineDetailKey.slotDuration == SlotDuration.THIRTY) {
          this.thirtyMinutesMachineDetailKey.push(machineDetailKey);
        } else {
          this.sixtyMinutesMachineDetailKey.push(machineDetailKey);
        }

      })

      this.fifteenMinutesMachineDetailKey = this.sortArrayBasedOnTime(this.fifteenMinutesMachineDetailKey);
      this.thirtyMinutesMachineDetailKey = this.sortArrayBasedOnTime(this.thirtyMinutesMachineDetailKey);
      this.sixtyMinutesMachineDetailKey = this.sortArrayBasedOnTime(this.sixtyMinutesMachineDetailKey);

      this.dataLoaded = true;
    }, (detailError) => {

      this.dataLoaded = true;
      this.errorMessage = detailError.error.message
    })
  }
  sortArrayBasedOnTime(keyArray: MachineDetailKey[]): MachineDetailKey[] {

    return keyArray.sort((key1, key2) => {
      if (key1.startTime < key2.startTime) {
        return -1;
      } else if (key1.startTime > key2.startTime) {
        return 1;
      }
      return 0;
    })

  }

  onBookingDateChange(selectedDate: Date) {
    this.dataLoaded = false;
    this.selectedDate = selectedDate;
    this.getMachineDetail();
  }

  stationSelectionListClicked(selectedStation: Station) {

    this.selectedStation = selectedStation;
    this.getMachineDetail();

  }

  levelSelectionListClicked(selectedMachineType: MachineType) {



    this.selectedMachineType = selectedMachineType;
    this.getMachineDetail();

  }

  machineButtonClicked(selectedStartTime: string, selectedMachineValue: MachineDetailValue) {
    this.selectedStartTime = selectedStartTime;
    this.selectedMachineValue = selectedMachineValue;
    let detailDialogModel = new DialogModel();
    detailDialogModel.machineDetailValue = selectedMachineValue
    let actions: Action[] = [];
    if (selectedMachineValue.machineCurrentStatus == MachineStatus.HALTED) {
      actions = [];
    } else if (selectedMachineValue.machineCurrentStatus == MachineStatus.ACTIVE) {
      if (selectedMachineValue.status == MachineDetailStatus.BOOKED) {
        actions = []
      } else {
        let action = new Action(1, "Book Now")
        actions.push(action);
      }
    }
    detailDialogModel.actions = actions;
    let dialogRef = this.matDialog.open(DetailDialogComponent, {
      data: detailDialogModel
    });
    dialogRef.afterClosed().subscribe((action: Action) => {
      if (action.identifier == 1) {
        this.bookMachine();
      }
    })
  }


  bookMachine() {

    let transformedDate = this.datePipe.transform(this.selectedDate, this.chargingService.dateFormatter);
    this.chargingService.bookMachine(transformedDate, this.selectedStartTime + ":00", this.selectedMachineValue.machineId, this.chargingService.loggedInUser.employeeId).subscribe((booking) => {
      this.booking = booking;

      let dialogRef = this.matDialog.open(UserETicketComponent, {
        data: this.booking,
        width: '50%',
        height: '70%'
      });
      dialogRef.afterClosed().subscribe((result) => {
        this.successMessage = "Machine Booked Successfully";
        this.ngOnInit();
      })



    }, (bookMachineError) => {
      this.errorMessage = bookMachineError.error.message
    })

  }

  errorClosed() {
    this.errorMessage = undefined;
  }

  successClosed() {
    this.successMessage = undefined;
  }
}
