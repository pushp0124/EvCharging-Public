import { MachineDetailValue } from './machineDetailValue';

export class DialogModel {
    headerMessage : string;
    dialogContent : string;
    actions : Action[];
    machineDetailValue : MachineDetailValue;
}

export class Action {
    message : string;
    identifier : number;
    constructor(identifier : number, message : string) {
        this.identifier = identifier;
        this.message = message;
    }
}