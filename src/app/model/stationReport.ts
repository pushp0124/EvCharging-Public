import { Station } from "./station";

export class StationReport {
    station : Station;
	totalMachinesCount : number;
	activeMachinesCount : number;
	haltedMachinesCount : number;
	removedMachinesCount : number;
	totalBookingAvailableMins : number;
    totalBookingMins : number;
    
    constructor(station : Station, totalMachinesCount : number,activeMachinesCount : number,haltedMachinesCount : number, removedMachinesCount : number,totalBookingAvailableMins : number, totalBookingMins : number) {
        this.station = station;
        this.totalMachinesCount = totalMachinesCount;
        this.activeMachinesCount = activeMachinesCount;
        this.haltedMachinesCount = haltedMachinesCount;
        this.removedMachinesCount = removedMachinesCount;
        this.totalBookingAvailableMins = totalBookingAvailableMins;
        this.totalBookingMins = totalBookingMins;
    }
    
    
}