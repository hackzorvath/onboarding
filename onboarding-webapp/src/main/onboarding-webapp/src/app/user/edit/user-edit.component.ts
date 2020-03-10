import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
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
            //this.phones = this.user.phoneList;
      });
    });

    // Print to console the user, first, and last name (remove after testing)
    this.subscriptions.push(this.formGroup.get('username').valueChanges
      .pipe(debounceTime(100))
      .subscribe(un => { console.log("Username: " + un); })
    );
    this.subscriptions.push(this.formGroup.get('firstName').valueChanges
      .pipe(debounceTime(100))
      .subscribe(fn => { console.log("First Name: " + fn); })
    );
    this.subscriptions.push(this.formGroup.get('lastName').valueChanges
      .pipe(debounceTime(100))
      .subscribe(ln => { console.log("Last Name: " + ln); })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  save(): void {
     const valueToSave = {...this.formGroup.value, userId: this.user.userId};

     this.userService.update(valueToSave).subscribe(user => {
       this.formGroup.patchValue(user);
     })
  }

  backToUser() {
    this.router.navigateByUrl('/users/' + this.user.userId);
  }

  private createFormGroup(): FormGroup {
    return this.formBuilder.group({
      'firstName': '',
      'lastName': '',
      'username': ''
    });
  }

}
