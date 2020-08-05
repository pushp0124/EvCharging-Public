import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ChargingService } from '../charging.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  errorMessage : string;
  successMessage : string;
  
  loginFormGroup: FormGroup;

  hide = true;

  constructor( private chargingService: ChargingService, private router: Router, private _formBuilder: FormBuilder) { }

  ngOnInit() {

    this.loginFormGroup = this._formBuilder.group({
      emailCtrl: ['', [Validators.email, Validators.required]],
      passwordCtrl : ['', [Validators.required]]
    });
  }

  loginUser() {
   
    this.chargingService.loginUser(this.emailCtrl.value, this.passwordCtrl.value).subscribe(employee => {
      this.chargingService.loggedInUser = employee;
      this.chargingService.loggedIn.next(true);
      if(employee.isAdmin) {
        this.router.navigate(['./adminhomepage'])
      } else {
        this.router.navigate(['./userhomepage'])
      }
      
    }, (loginError) => { 
      this.errorMessage = loginError.error.message; 

    }
    )
  }

  get emailCtrl(): AbstractControl {
    return this.loginFormGroup.controls['emailCtrl'];
  }

  get passwordCtrl(): AbstractControl {
    return this.loginFormGroup.controls['passwordCtrl'];
  }

  errorClosed() {
    this.errorMessage = undefined;
  }

  successClosed() {
    this.successMessage = undefined;
  }
}
