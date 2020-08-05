import { SlotDuration } from './slotDuration';
import { MachineType } from './machineType';

export class MachineDetailKey   {

	startTime : string;
    endTime : string;
	slotDuration : SlotDuration;
	machineType : MachineType;

	constructor(startTime : string, endTime : string,slotDuration : SlotDuration, machineType: MachineType) {
		this.startTime = startTime;
		this.endTime = endTime;
		this.slotDuration = slotDuration;
		this.machineType = machineType;
	}
}