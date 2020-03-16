import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../user.service";

import {UserModel} from "../user.model"
import {Subscription} from "rxjs";
import {debounceTime, delay} from "rxjs/internal/operators";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit, OnDestroy {

  formGroup: FormGroup = this.createFormGroup();
  subscriptions: Subscription[] = [];
  loadingSubscription: Subscription = Subscription.EMPTY;

  user: UserModel;

  constructor(private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private userService: UserService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
        this.userService.get(params['userId']).subscribe(data => {
        this.user = data;
      });
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  save(): void {
    if(this.formGroup.valid) {
      const valueToSave = {...this.formGroup.value,
        userId: this.user.userId};

      this.userService.update(valueToSave).subscribe(user => {
       this.formGroup.patchValue(user);
      })

      this.router.navigateByUrl('/users/' + this.user.userId);
    }
  }

  backToUser() {
    this.router.navigateByUrl('/users/' + this.user.userId);
  }

  get username() {
    return this.formGroup.get('username');
  }

  get firstName() {
    return this.formGroup.get('firstName');
  }

  get lastName() {
    return this.formGroup.get('lastName');
  }

  private createFormGroup(): FormGroup {
    return this.formBuilder.group({
      'firstName': '',
      'lastName': '',
      'username': ''
    });
  }

}
