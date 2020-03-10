import { Component, OnInit }      from '@angular/core';
import { UserModel }              from "../user.model";
import { UserService }            from "../../user.service";
import { UserCreateComponent }    from "../create/user-create.component";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: UserModel[] = [];

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.findAllUsers().subscribe(users => {
      this.users = users;
    });
  }

  navigateToUser(user: UserModel) {
    this.router.navigateByUrl('/users/' + user.userId);
  }

  editUser(user: UserModel) {
    this.router.navigateByUrl('/edit/' + user.userId);
  }

  deleteUser(user: UserModel) {
    var ans = window.confirm(
      "Are you sure you wish to delete " +
      user.firstName + " " +
      user.lastName + "?\n" +
      "(Warning: this action CANNOT be undone)");

    if(ans) {
      this.userService.delete(user.userId).subscribe();
      this.router.navigateByUrl('/users').then(() => {});
      if (user.userId == undefined) {
        document.location.reload();
      }
    }
  }
}
