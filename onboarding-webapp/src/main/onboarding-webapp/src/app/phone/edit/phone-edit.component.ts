import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserModel } from '../../user/user.model'
import { PhoneModel } from '../phone.model'
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../user/user.service';
import { PhoneService } from '../phone.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-phone-edit',
  templateUrl: './phone-edit.component.html',
  styleUrls: ['./phone-edit.component.css']
})
export class PhoneEditComponent implements OnInit {

  user: UserModel;
  phone: PhoneModel;
  formGroup: FormGroup = this.createFormGroup();
  subscriptions: Subscription[] = [];

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private phoneService: PhoneService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      this.phoneService.get(params['userId'], params['phoneId']).subscribe(data => {
        this.phone = data;
        console.log("phone", data)
      });
    });
    this.activatedRoute.params.subscribe(params => {
      this.userService.get(params['userId']).subscribe(data => {
        this.user = data;
      });
    });
  }

  save() {
     const valueToSave = {...this.phone, ...this.formGroup.getRawValue()}
     this.phoneService.update(this.user.userId, valueToSave).subscribe(phone => {
       this.formGroup.patchValue(phone);
     });

     this.returnToUser();
  }

  returnToUser() {
    this.router.navigateByUrl('/users/' + this.phone.userId);
  }

  private createFormGroup(): FormGroup {
    return this.formBuilder.group({
      'phoneNumber':'',
      'verified':false
    });
  }

}
