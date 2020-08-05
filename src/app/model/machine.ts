import { MachineType } from './machineType';
import { MachineStatus } from './machineStatus';
import { Station } from './station';
import { SlotDuration } from './slotDuration';

export class Machine {
    machineId : number;
	machineName : string;
	machineType : MachineType;
	machineStatus : MachineStatus; 
	machineStation : Station;
	slotDuration : SlotDuration; 
	startingDate : Date;
	startTime : string;
    endTime : string;
    constructor(machineId: number, endTime: string,machineName: string,machineStatus: MachineStatus, machineType: MachineType, slotDuration: SlotDuration, machineStation: Station,startingDate: Date, startTime: string) {
        this.machineId = machineId;
        this.machineName = machineName;
        this.machineType =  machineType;
        this.machineStatus = machineStatus;
        this.machineStation = machineStation;
        this.slotDuration = slotDuration;
        this.startingDate = startingDate;
        this.startTime = startTime;
        this.endTime = endTime;
    }
}