import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { authInfo, endpoint } from '../models';
import { Observable } from 'rxjs';
import { authToken } from '../models/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(
    private http: HttpClient, private cookie: CookieService
  ) { }

  setToken(token: string) {
    this.cookie.set('token', token);
  }

  getToken() {
    return this.cookie.get('token');
  }

  deleteToken() {
    this.cookie.delete('token');
  }

  setRole(role: string) {
    this.cookie.set('role', role);
  }

  getRole() {
    return this.cookie.get('role');
  }

  deleteName() {
    this.cookie.delete('role');
  }

  setName(name: string) {
    this.cookie.set('name', name);
  }

  getName() {
    return this.cookie.get('name');
  }

  deleteRole() {
    this.cookie.delete('name');
  }

  login(dataAuth: authInfo): Observable<authToken> {
    return this.http.post<authToken>(endpoint + '/auth/authenticate', dataAuth)
  }

  register(dataRegister: any) {
    return this.http.post(endpoint + '/auth/new-clinic/register', dataRegister, {responseType: 'text'})
  }
}
