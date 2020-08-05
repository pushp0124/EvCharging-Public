import { Station } from './station';
import { MachineType } from './machineType';

export class Employee {
    employeeId : number;
    mailId : string;
    empName : string;
	phoneNo : string;
    employeeMachineType : MachineType;
    employeeStation : Station;
    isAdmin : boolean;
    
    constructor(employeeId: number,mailId: string, empName: string, phoneNo: string,isAdmin: boolean,employeeMachineType: MachineType, employeeStation: Station) {
        this.employeeId = employeeId;
        this.mailId = mailId;
        this.empName = empName;
        this.phoneNo = phoneNo;
        this.isAdmin = isAdmin;
        this.employeeMachineType = employeeMachineType;
        this.employeeStation = employeeStation;
    }
}