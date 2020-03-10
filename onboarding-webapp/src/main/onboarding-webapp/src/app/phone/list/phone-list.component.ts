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

}
