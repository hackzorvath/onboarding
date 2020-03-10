import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserModel } from '../../user/user.model'
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../user/user.service';
import { PhoneService } from '../phone.service';

@Component({
  selector: 'app-phone-create',
  templateUrl: './phone-create.component.html',
  styleUrls: ['./phone-create.component.css']
})
export class PhoneCreateComponent implements OnInit {

  user: UserModel;
  newPhoneForm: FormGroup = this.createFormGroup();

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private phoneService: PhoneService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userService.get(params['userId']).subscribe(data => {
        this.user = data;
      });
    });
  }

  onSubmit() {
    const valueToSave = {...this.newPhoneForm.value, userId: this.user.userId};
    this.phoneService.create(this.user.userId, valueToSave).subscribe(user => {
      this.newPhoneForm.patchValue(user);
    })
    this.returnToUser();
  }

  returnToUser() {
    this.router.navigateByUrl('/users/' + this.user.userId);
  }

  private createFormGroup(): FormGroup {
    return this.formBuilder.group({
      'phoneNumber':'',
      'verified':'false'
    });
  }

}
