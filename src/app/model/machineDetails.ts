import { MachineDetailKey } from './machineDetailKey';
import { MachineDetailValue } from './machineDetailValue';
import { SlotDuration } from './slotDuration';
import { MachineType } from './machineType';

export class MachineDetails {

    machineDetails :  Map<MachineDetailKey,MachineDetailValue[]> = new Map<MachineDetailKey,MachineDetailValue[]>();

    // constructor(jsonObj: Object) {
    //     for (let prop in jsonObj) {
    //         this[prop] = jsonObj[prop];
    //         console.log(this[prop]);
    //         for(let innerProp in this[prop]) {
    //             //this[prop].set(<MachineDetailKey>jsonObj[prop][innerProp],[]);
                
    //         }
    //     }
    //     Object.keys(this.machineDetails).forEach((key) => {
    //         console.log(this.machineDetails[key]);
    //     })
  //}
    
}