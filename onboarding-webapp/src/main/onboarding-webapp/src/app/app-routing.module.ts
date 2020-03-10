import { NgModule }                   from '@angular/core';
import { RouterModule, Routes }       from '@angular/router';
import { UserListComponent }          from "./user/list/user-list.component";
import { UserCreateComponent }        from "./user/create/user-create.component";
import { UserEditComponent }          from "./user/edit/user-edit.component";
import { HashLocationStrategy,
          LocationStrategy }          from "@angular/common";
import { UserEditTemplateComponent }  from "./user/edit-template/user-edit-template.component";
import { UserComponent }              from "./user/profile/user.component";

import { PhoneCreateComponent }        from "./phone/create/phone-create.component";
import { PhoneEditComponent }        from "./phone/edit/phone-edit.component";


const routes: Routes = [
  { path: '', component: UserListComponent },
  { path: 'users', component: UserListComponent },
  { path: 'create', component: UserCreateComponent },
  { path: 'edit/:userId', component: UserEditComponent },
  { path: 'add-phone/:userId', component: PhoneCreateComponent },
  { path: 'edit-phone/:userId/:phoneId', component: PhoneEditComponent },
  { path: 'users/:userId', component: UserComponent },
  { path: 'users2/:userId', component: UserEditTemplateComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}]
})
export class AppRoutingModule {
}
