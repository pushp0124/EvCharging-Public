import { NgForm, Validators, FormControl } from '@angular/forms';
import { MachineStatus } from './../model/machineStatus';
import { Machine } from './../model/machine';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MachineType } from '../model/machineType';
import { SlotDuration } from '../model/slotDuration';
import { Station } from '../model/station';
import { ChargingService } from '../charging.service';



@Component({
    selector: 'app-admin-add-machine',
    templateUrl: './admin-add-machine.component.html',
    styleUrls: ['./admin-add-machine.component.css']
})
export class AdminAddMachineComponent implements OnInit {

    startTime: string[] = [];
    endTime: string[] = [];
    selectedStartTime: string;
    selectedEndTime: string;

    selectedStation: Station;
    stations: Station[];
    selectedStartDate: Date;
    machineTypes = [MachineType.LEVEL1, MachineType.LEVEL2, MachineType.LEVEL3];
    slotDurations = [SlotDuration.SIXTY, SlotDuration.THIRTY, SlotDuration.FIFTEEN];
    machineStatus = [MachineStatus.ACTIVE, MachineStatus.HALTED, MachineStatus.REMOVED];
    selectedMachineType: MachineType = this.machineTypes[0];
    selectedMachineSlot: SlotDuration = this.slotDurations[0];

    selectedMachineStatus: MachineStatus = this.machineStatus[0];

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
    constructor(private chargingService: ChargingService, private router: Router) { }

    ngOnInit() {
        this.initialiseTime();
        this.selectSlotDuration()
        this.chargingService.getAllStations().subscribe((stations) => {
            console.log(stations);
            this.selectedStation = stations[0];
            this.stations = stations;
            this.chargingService.stations = stations;
        }, (stationErrorData) => {
            this.errorMessage = stationErrorData.error.message;
        })

    }

    addMachine() {
        let addNewMachinesArray: Machine[] = []
        let machine = new Machine(null, this.selectedEndTime, null, this.selectedMachineStatus, this.selectedMachineType, this.selectedMachineSlot, this.selectedStation, this.selectedStartDate, this.selectedStartTime);
        addNewMachinesArray.push(machine);
        this.chargingService.addMachines(this.selectedStation.stationId, addNewMachinesArray).subscribe((machines) => {
            this.successMessage = "Machine Added Successfully"
        }, (machineAddError) => {
            this.errorMessage = machineAddError.error.message;
        })
    }


    stationSelectionListClicked(selectedStationIndex: number) {
        console.log(selectedStationIndex);
        this.selectedStation = this.stations[selectedStationIndex];
    }

    selectMachineType(machineType: MachineType) {
        this.selectedMachineType = machineType;
    }
    selectSlotDuration() {


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
              startTimeSelectedIndex =  this.sixtyMinsStartTime.findIndex((time) => {
                 return this.selectedStartTime == time;
             })
          
            
        } else if (this.selectedMachineSlot == SlotDuration.THIRTY) {
            startTimeSelectedIndex =  this.thirtyMinsStartTime.findIndex((time) => {
                return this.selectedStartTime == time;
            })
        } else {
            startTimeSelectedIndex =  this.fifteenMinsStartTime.findIndex((time) => {
                return this.selectedStartTime == time;
            })
        }
        this.startEndTimeIndex = startTimeSelectedIndex  + 1;
    }

    endTimeSelected() {
        // this.selectedEndTime = this.endTime[endTimeSeletedIndex];

    }

    onStartingDateChange() {
        if (this.selectedStartDate > this.minDate) {
            this.infoMessage = "Please note that machine will be in halt state till the midnight hours of " + this.selectedStartDate + " ,we will resume it automatically from the selected date."
            this.selectedMachineStatus = MachineStatus.HALTED
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



