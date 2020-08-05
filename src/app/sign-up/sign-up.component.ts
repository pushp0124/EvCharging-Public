import { Component, OnInit } from '@angular/core';
import { ChargingService } from '../charging.service';
import { Employee } from '../model/employee';
import { MachineType } from '../model/machineType';
import { Station } from '../model/station';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  
  selectedStation : Station;
  stations : Station[];
  chargerTypes  = [MachineType.LEVEL1,MachineType.LEVEL2,MachineType.LEVEL3];
  selectedMachineType : MachineType = this.chargerTypes[0];
  constructor(private chargingService : ChargingService, private _formBuilder: FormBuilder, private router: Router) { }

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup : FormGroup;
  isEditable = true;
  hide = true;
  isAdminSignUp = false;
  errorMessage : string;

  ngOnInit() {
    
    this.firstFormGroup = this._formBuilder.group({
      nameCtrl: ['', Validators.required],

    });
    this.secondFormGroup = this._formBuilder.group({
      emailCtrl: ['', [Validators.required,Validators.email]],
      phoneCtrl : ['', Validators.required]
    });

    this.thirdFormGroup = this._formBuilder.group({
      passwordCtrl: ['', Validators.required],
      confirmPasswordCtrl : ['', Validators.required]
    });
    this.chargingService.getAllStations().subscribe((stations) => {
      
      this.stations = stations;
      this.selectedStation = stations[0];
      this.chargingService.stations = stations;
    },(stationErrorData) => {
       this.errorMessage = stationErrorData.error.message;
    })
  }


  registerEmployee() {
      //get the current route path
      let currentUrl = this.router.url
      let arrayOfUrls = currentUrl.split("/");
      if(arrayOfUrls[arrayOfUrls.length - 1] == 'adminSignup') {
          this.isAdminSignUp = true;
      }
      let employee = new Employee(null,this.email.value,this.name.value,this.phoneNo.value,this.isAdminSignUp,this.selectedMachineType,this.selectedStation);
      
      this.chargingService.registerEmployee(employee,this.password.value,false).subscribe((employeeId) => {
        employee.employeeId = employeeId;
        this.chargingService.loggedInUser = employee;
        this.chargingService.loggedIn.next(true);
        if(employee.isAdmin) {
          this.router.navigate(['./adminhomepage'])
        } else {
          this.router.navigate(['./userhomepage'])
        }   
      }, (loginError) => {
          this.errorMessage = loginError.error.message;  
      })
  }

  stationListClicked() {
    // this.selectedStation = this.stations[selectedStationIndex];
  }
  machineListClicked() {
    // this.selectedMachineType = machineType;
  }

  onPasswordChange() {
    if (this.confirm_password.value == this.password.value) {
      this.confirm_password.setErrors(null);
    } else {
      this.confirm_password.setErrors({ mismatch: true });
    }
  }
  
  // getting the form control elements
  get password(): AbstractControl {
    return this.thirdFormGroup.controls['passwordCtrl'];
  }

  get email(): AbstractControl {
    return this.secondFormGroup.controls['emailCtrl'];
  }

  get name(): AbstractControl {
    return this.firstFormGroup.controls['nameCtrl'];
  }
  get phoneNo(): AbstractControl {
    return this.secondFormGroup.controls['phoneCtrl'];
  }
  
  
  get confirm_password(): AbstractControl {
    return this.thirdFormGroup.controls['confirmPasswordCtrl'];
  }
}
