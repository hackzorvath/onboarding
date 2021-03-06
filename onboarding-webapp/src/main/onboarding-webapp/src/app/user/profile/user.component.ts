import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { PhoneService } from '../../phone/phone.service';
import { UserModel } from '../user.model';
import { PhoneModel } from '../../phone/phone.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: UserModel;
  phones: PhoneModel[];

  constructor(private userService: UserService,
              private phoneService: PhoneService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userService.get(params['userId']).subscribe(data => {
        this.user = data;
        this.phones = this.user.phones;
      });
    });


  }

  editUser() {
    this.router.navigateByUrl('/edit/' + this.user.userId);
  }

  deleteUser() {
    var ans = window.confirm(
      "Are you sure you wish to delete " +
      this.user.firstName + " " +
      this.user.lastName + "?\n" +
      "(Warning: this action CANNOT be undone)");

    if(ans) {
//       for(phone of this.phones) {
//         this.phoneService.delete(phone.userId, phone.phoneId).subscribe(data => {});
//       }

      this.userService.delete(this.user.userId).subscribe(data => {});
      this.router.navigate(['/']);
    }
  }
}
