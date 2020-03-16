import { Component, OnInit } from '@angular/core';
import { PhoneModel } from '../phone.model'
import { PhoneService } from "../phone.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-phone-list',
  templateUrl: './phone-list.component.html',
  styleUrls: ['./phone-list.component.css']
})
export class PhoneListComponent implements OnInit {

  phones: PhoneModel[];
  userId: string;

  constructor(private activatedRoute: ActivatedRoute,
              private phoneService: PhoneService,
              private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.phoneService.findAllPhones(params['userId']).subscribe(phones => {
        this.phones = phones;
        this.userId = params['userId'];
      });
    });
  }

  addPhone() {
    this.router.navigateByUrl('/add-phone/' + this.userId);
  }

  verifyPhone(phone: PhoneModel) {
    this.router.navigateByUrl('/verify/' + phone.userId + "/phones/" + phone.phoneId);
  }

  editPhone(phone: PhoneModel) {
    this.router.navigateByUrl('/edit-phone/' + phone.userId + '/' + phone.phoneId);
  }

  deletePhone(phone: PhoneModel) {
    var ans = window.confirm(
      "Are you sure you wish to delete " +
      phone.phoneNumber + "?\n" +
      "(Warning: this action CANNOT be undone)");

    if(ans) {
      this.phoneService.delete(phone.userId, phone.phoneId).subscribe(data => {});
      document.location.reload();
    }
  }

}
