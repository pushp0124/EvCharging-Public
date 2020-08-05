import { MachineDetailStatus } from './machineDetailStatus';
import { MachineStatus } from './machineStatus';

export class MachineDetailValue {
    machineId : number;
	bookedByEmployeeId : number;
	status : MachineDetailStatus;
	machineName : string;
	machineStartingDate : Date;
	machineCurrentStatus : MachineStatus;


	constructor(machineId: number, bookedByEmployeeId : number, status : MachineDetailStatus, machineName: string,machineStartingDate : Date,machineCurrentStatus: MachineStatus) {
		this.machineId = machineId;
		this.bookedByEmployeeId = bookedByEmployeeId;
		this.status = status;
		this.machineName = machineName;
		this.machineStartingDate = machineStartingDate;
		this.machineCurrentStatus = machineCurrentStatus;
	}

}