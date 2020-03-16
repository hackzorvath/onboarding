import { Component, OnInit } from '@angular/core';
import { PhoneModel } from '../phone.model';
import { PhoneService } from "../phone.service";
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";


@Component({
  selector: 'app-phone-verify',
  templateUrl: './phone-verify.component.html',
  styleUrls: ['./phone-verify.component.css']
})
export class PhoneVerifyComponent implements OnInit {

  phone: PhoneModel;
  code: string;
  phoneVerifyForm: FormGroup = this.createFormGroup();

  constructor(private phoneService: PhoneService,
              private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.phoneService.get(params['userId'], params['phoneId']).subscribe(data => {
        this.phone = data;
      });
    });
  }

  getData() {
    console.log(this.phone.phoneNumber);
    console.log(this.phone.phoneId);
    console.log(this.phone.userId);
  }

  close() {
  }

  sendVerificationCode() {
    this.phoneService.sendVerificationCode(this.phone.phoneId, this.phone.phoneId).subscribe();
  }

  submitVerificationCode() {
  }

  resendVerificationCode() {
    this.sendVerificationCode();
  }

  returnToUser() {
    this.router.navigateByUrl('/users/' + this.phone.userId);
  }

  get verificationCode() {
    return this.phoneVerifyForm.get('verificationCode');
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      'verificationCode': [
        '', [
          Validators.required,
          Validators.pattern(new RegExp('^[0-9]{4}')),
          Validators.minLength(4)
        ]
      ]
    });
  }
}
