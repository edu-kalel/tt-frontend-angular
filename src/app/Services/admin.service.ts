import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthServiceService } from './auth-service.service';
import { endpoint, User } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http: HttpClient, private cookie: CookieService,
    private authService: AuthServiceService
  ) { }

  getAllUsersStaff(): Observable<User[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.get<User[]>(endpoint + '/admin/staff', { headers})
  }

  newUser(typeEndpoint: string, user: User) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.post(endpoint + typeEndpoint, user, { headers})
  }
}
