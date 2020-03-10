import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserModel} from "./user/user.model";
import {Observable} from "rxjs";

const BASE_URI = './api/v1/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {
  }

  findAllUsers(): Observable<UserModel[]> {
    return this.httpClient.get<UserModel[]>(BASE_URI);
  }

  // SHould tis be a UUID instead of a string?
  get(userId: string): Observable<UserModel> {
    return this.httpClient.get<UserModel>(`${BASE_URI}/${userId}`);
  }

  update(user: UserModel): Observable<UserModel> {
    return this.httpClient.put<UserModel>(`${BASE_URI}/${user.userId}`, user);
  }

  save(user: UserModel): Observable<UserModel> {
    return this.httpClient.post<UserModel>(`${BASE_URI}`, user);
  }

  delete(userId: string): Observable<UserModel> {
    return this.httpClient.delete<UserModel>(`${BASE_URI}/${userId}`);
  }
}

// DONE
