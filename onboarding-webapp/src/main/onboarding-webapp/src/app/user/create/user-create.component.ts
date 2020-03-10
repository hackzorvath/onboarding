import { Component, OnInit }      from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService }            from '../user.service';
import { Subscription }           from "rxjs";
import { debounceTime, delay }    from "rxjs/internal/operators";

import { UserModel }              from '../user.model';
import { Validators, FormArray,
  ValidatorFn, AbstractControl }  from '@angular/forms';


@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  newUser: UserModel;
  subscriptions: Subscription[] = [];
  newUserForm: FormGroup = this.createFormGroup();

  private userId: string;
  //errors: any;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.subscriptions.push(this.newUserForm.get('firstName').valueChanges
      .pipe(debounceTime(100))
      .subscribe(v => { console.log("First name: " + v);
      }));
    console.log(this.newUserForm);
  }

  ngOnDestroy() {
      this.subscriptions.forEach(s => s.unsubscribe());
      document.location.reload();
  }

  onSubmit() {
    const valueToSave = {...this.newUserForm.value};

    this.userService.save(valueToSave).subscribe(user => {
      this.newUserForm.patchValue(user);
    })
    this.router.navigate(['/']);

//     err => {
//           this.errors=err.error;
//           console.log(this.errors);
//     }*/);
  }

  private createFormGroup(): FormGroup {
    return this.formBuilder.group({
      'username': '',
      'firstName': '',
      'lastName': ''
    });
  }
}
