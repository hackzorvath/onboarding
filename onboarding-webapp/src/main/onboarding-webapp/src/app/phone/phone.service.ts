import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PhoneModel} from "./phone.model";

const BASE_URI = './api/v1/users';

@Injectable({
  providedIn: 'root'
})
export class PhoneService {

  constructor(private httpClient: HttpClient) {
  }

  public findAllPhones(userId: string): Observable<PhoneModel[]> {
    return this.httpClient.get<PhoneModel[]>(`${BASE_URI}/${userId}/phones`);
  }

  public create(userId: string, phone: PhoneModel): Observable<PhoneModel> {
    return this.httpClient.post<PhoneModel>(`${BASE_URI}/${userId}/phones`, phone);
  }

  public get(userId: string, phoneId: string): Observable<PhoneModel> {
    return this.httpClient.get<PhoneModel>(`${BASE_URI}/${userId}/phones/${phoneId}`);
  }

  public update(userId: string, phone: PhoneModel): Observable<PhoneModel> {
    return this.httpClient.put<PhoneModel>(`${BASE_URI}/${userId}/phones/${phone.phoneId}`, phone);
  }

  public delete(userId: string, phoneId: string) {
    return this.httpClient.delete(`${BASE_URI}/${userId}/phones/${phoneId}`);
  }

  public sendVerificationCode(userId: string, phoneId: string): Observable<PhoneModel> {
    return this.httpClient
      .post<PhoneModel>(`${BASE_URI}/${userId}/phones/${phoneId}/sendVerificationCode`, null);
  }

  public submitVerificationCode(userId: string, phoneId: string, verifCode: string): Observable<PhoneModel> {
    return this.httpClient
      .post<PhoneModel>(`${BASE_URI}/${userId}/phones/${phoneId}/sendVerificationCode/${verifCode}`, null);
  }
}
