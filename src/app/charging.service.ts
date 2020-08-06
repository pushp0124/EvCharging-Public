import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { Employee } from './model/employee';
import { MachineType } from './model/machineType';
import { SlotDuration } from './model/slotDuration';
import { Machine } from './model/machine';
import { Station } from './model/station';
import { MachineDetails } from './model/machineDetails';
import { Booking } from './model/booking';
import { ReportFormat } from './model/reportFormat';
import { Router } from '@angular/router';
import { StationReport } from './model/stationReport';
import { MachineReport } from './model/machineReport';
@Injectable({
  providedIn: 'root'
})
export class ChargingService {
  
  loggedInUser : Employee = new Employee(1, null,null,null,false,null,null);
  loggedIn = new BehaviorSubject<boolean>(false);
  dateFormatter = 'yyyy-MM-dd'; 
  normalMaintenanceDays  = 7;
  private baseUrl = "http://localhost:8080";
  stations: Station[];

  @Output() fireIsLoggedIn: EventEmitter<Employee> = new EventEmitter<Employee>();

  
  	constructor(private http: HttpClient, private router: Router) {}

  	get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  	}
  	registerEmployee(employee: Employee,password: string, isAdmin: boolean) : Observable<number>   {
		return this.http.post<number>(this.baseUrl + "/register/employee/" + password + "/" + isAdmin,employee);
	}
	
	//This handles the get mapping for signing in request for both employee and admin
	loginUser(email: string, password: string) : Observable<Employee>  {
		return this.http.post<Employee>(this.baseUrl + "/login/" + email + "/" + password,null);
	}
	
	//This handles the get request for fetching a list of all stations
	getAllStations() : Observable<Station[]> {
		return this.http.get<Station[]>(this.baseUrl + "/get/stations/");
		
	}
	
	//Employee Actions
	
	//This handles the get request for fetching the next available date for booking
	getNextAvailableBookingDate(forMachineType : MachineType, stationId: number) : Observable<Date>  {
		return this.http.get<Date>(this.baseUrl + "/get/nextDate/" + forMachineType + "/" + stationId);
	}
	
	
	//This handles the get request for fetching the machine details, whether they are booked by or not and if booked by whom, by machine type.
	getMachineBookingDetailByType(selectedDate : string, selectedMachineType: MachineType,stationId:  number) : Observable<MachineDetails>  {
	
		return this.http.get<MachineDetails>(this.baseUrl + "/get/bookingDetailByType/" + selectedDate + "/" + selectedMachineType + "/" + stationId);
	}
	
	//This handles the get request for getting the all bookings done by employee. 
  	getEmployeeAllBookings(empId : number) : Observable<Booking[]>  {
		return this.http.get<Booking[]>(this.baseUrl + "/get/allBookings/" + empId);
	}
	
  	getEmployeeCurrentBookings(empId: number) : Observable<Booking[]> {
		return this.http.get<Booking[]>(this.baseUrl + "/currentBookings/" + empId);
	}
	
  	bookMachine(bookedDate : string,bookingStartTime: string,machineId: number,employeeId : number) : Observable<Booking>  {
		return this.http.post<Booking>(this.baseUrl + "/bookMachine/" + bookedDate + "/" + bookingStartTime + "/" + machineId + "/" + employeeId,null);
	}
	
	//This handles the put request for changing the status of Booking to CANCELLED
  	cancelBooking(ticketNo : number) : Observable<Booking[]>  {
		return this.http.put<Booking[]>(this.baseUrl + "/cancelBooking/" + ticketNo,null);
	}
	
	// This handles the put request for rescheduling the booking, changing the current booking status to RESCHEDULED and creating a new booking
	rescheduleBooking(rescheduleTicketNo : number,rescheduledBookedDate : Date,rescheduledBookingStartTiming : string,machineId : number,employeeId : number) : Observable<Booking>  {
    	return this.http.put<Booking>(this.baseUrl + "/rescheduleBooking/ " + rescheduleTicketNo + "/" + rescheduledBookedDate + "/" + rescheduledBookingStartTiming + "/" + machineId + "/" + employeeId,null);
	}
	
	
	//Admin actions
	
	// This handles the get request for  for fetching the machine details, whether they are booked by or not and if booked by whom, by machine slot duration.
  	getMachineBookingDetailBySlot(selectedDate : Date,selectedSlotDuration : SlotDuration, stationId : number) {
		return this.http.get<MachineDetails>(this.baseUrl + "/get/bookingDetailBySlot/" + selectedDate + "/" + selectedSlotDuration + "/" + stationId);
	}
	
	//This handles the post request for adding new machines to the existing station.
  	addMachines(stationId : number,machines : Machine[]) : Observable<Boolean> {
		return this.http.post<Boolean>(this.baseUrl + "/add/machines/" + stationId,machines);
	}
	

	//This handles the delete request for changing the status of machine to REMOVED, so that employee may see the past bookings
	removeMachine(machineId : number) : Observable<Machine> {
    	return this.http.put<Machine>(this.baseUrl + "/remove/machine/" + machineId,null);
  	}
	
	
	//This handles the put request for halting machine with new start date
	haltMachine(machineId : number,newStartDate : string) : Observable<Machine>{
		return this.http.put<Machine>(this.baseUrl + "/haltMachine/" + machineId + "/" + newStartDate, null);
	}
	
	//This handles the halting request for normal maintenance of machine with new start date, new start time and new end time
  	haltMachineNormalMaintenance(machineId : number,newStartDate : string,newStartTime: string,newEndTime : string) : Observable<Machine> {
    return this.http.put<Machine>(this.baseUrl + "/haltMachine/normalMaintenance/" + machineId +  "/" + newStartDate + "/" + newStartTime + "/" + newEndTime, null);
	}
	
	//This handles the put request for resuming the halted machine
  	resumeMachine(machineId : number) : Observable<Machine>  {
		return this.http.put<Machine>(this.baseUrl + "/resumeMachine/" + machineId,null);
	}
	
	//This handles the put request for modifying machine with whole updated machine object passed in Request Body
  	modifyMachine(modifiedMachine : Machine) : Observable<Machine>  {
		return this.http.put<Machine>(this.baseUrl + "/modifyMachine",modifiedMachine);
	}
	
	//This handles the get request for report generation for all the bookings done at particular station from start to end date
  	generateBookingsReport(fromDate : string,toDate : string,stationId : number) : Observable<ReportFormat[]> {
    return this.http.get<ReportFormat[]>(this.baseUrl + "/generateReport/" + fromDate + "/" + toDate + "/" + stationId);  
  	}
	
	//This handles the get request for report generation for all the bookings done for particular machine from start to end date 
  	generateMachineBookingsReport(fromDate : string, toDate : string,machineId : number) {
    return this.http.get<Booking[]>(this.baseUrl + "/generateReport/machine/" + fromDate + "/" + toDate + "/" + machineId);
  	}
	
	//This handles the post request for adding the charging station 
  	addStation(city : string,campusLocation: string) : Observable<Station[]> {
		return this.http.post<Station[]>(this.baseUrl + "/add/station/" + city + "/" + campusLocation,null);
  	}

  //This handles the get request for getting all the machines of a particular station
	
   getMachinesofStation(stationId : number) : Observable<Machine[]> {
		return this.http.get<Machine[]>(this.baseUrl + "/get/machines/" + stationId);
   }

   	getAllStationsReport(fromDate : string,toDate : string) : Observable<StationReport[]> {
		return this.http.get<StationReport[]>(this.baseUrl + "/get/stations/dashboard/report/" + fromDate + "/" + toDate);
	}
	
	getMachineReport(machineId : number,fromDate : string,toDate : string) : Observable<MachineReport> {

		return this.http.get<MachineReport>(this.baseUrl + "/get/machine/dashboard/report/" + machineId  +"/" + fromDate +"/" +toDate);
	}
	
	getMachinesReportOfStation(stationId : number,fromDate : string,toDate : string) : Observable<MachineReport[]>  {
		return this.http.get<MachineReport[]>(this.baseUrl + "/get/station/machines/dashboard/reports/" + stationId  +"/" + fromDate +"/" + toDate);
		
	}
	
	changePassword(phoneNo : string,newPassword : string) : Observable<Employee> {
		return this.http.get<Employee>(this.baseUrl + "/change/password/" + phoneNo + "/" + newPassword);
	}

  	logout() {
	  this.loggedIn.next(false);
	  this.loggedInUser = undefined;
	  this.stations = [];
	  this.router.navigate(['']);
  	}

}
