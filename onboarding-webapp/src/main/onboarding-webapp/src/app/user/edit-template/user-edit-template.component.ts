import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserModel} from "../user.model";
import {Subscription} from "rxjs";
import {UserService} from "../user.service";
import {ActivatedRoute} from "@angular/router";
import {delay} from "rxjs/internal/operators";

@Component({
  selector: 'app-user-edit-template',
  templateUrl: './user-edit-template.component.html',
  styleUrls: ['./user-edit-template.component.css']
})
export class UserEditTemplateComponent implements OnInit, OnDestroy {

  user: UserModel;
  subscriptions: Subscription[] = [];
  loadingSubscription: Subscription = Subscription.EMPTY;

  private userId: string;

  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService) {
  }

  ngOnInit() {
    this.subscriptions.push(this.activatedRoute.params.subscribe(params => {
      this.userId = params['userId'];
      this.loadingSubscription = this.userService.get(this.userId)
        .pipe(
          delay(1000)
        ).subscribe(user => {
          this.user = user;
        });
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  save(): void {
    this.userService.update(this.user).subscribe(user => {
      this.user = user;
    });
  }
}
