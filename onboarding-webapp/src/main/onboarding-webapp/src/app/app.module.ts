import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { UserListComponent } from './user/list/user-list.component';
import { UserCreateComponent } from './user/create/user-create.component';
import { UserEditComponent } from './user/edit/user-edit.component';
import { HttpClientModule } from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { UserEditTemplateComponent } from './user/edit-template/user-edit-template.component';
import { UserComponent } from './user/profile/user.component';

import { PhoneCreateComponent } from './phone/create/phone-create.component';
import { PhoneListComponent } from './phone/list/phone-list.component';
import { PhoneEditComponent } from './phone/edit/phone-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserCreateComponent,
    UserEditComponent,
    UserEditTemplateComponent,
    UserCreateComponent,
    UserComponent,
    PhoneCreateComponent,
    PhoneListComponent,
    PhoneEditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
