import { Machine } from './machine';
import { Employee } from './employee';
import { BookingStatus } from './bookingStatus';

export class Booking {
    ticketNo : number;
	bookedMachine : Machine;
	bookingByEmployee :Employee;
	bookedDate : Date; 
	bookingStartTime : string;
    bookingEndTime : string;
	status :BookingStatus ;
}