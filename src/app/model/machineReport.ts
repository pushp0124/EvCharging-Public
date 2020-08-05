import { Machine } from "./machine";

export class MachineReport {
    machine : Machine;
	bookingMins : number;
	freeMins : number;
	bookingCancelledMins : number;
    bookingRescheduledMins : number;
    

    constructor(machine : Machine,bookingMins : number, freeMins :number, bookingCancelledMins : number, bookingRescheduledMins : number) {
    
    this.machine = machine;
    this.bookingMins = bookingMins;
    this.freeMins = freeMins;
    this.bookingCancelledMins = bookingCancelledMins;
    this.bookingRescheduledMins = bookingRescheduledMins;
}
}