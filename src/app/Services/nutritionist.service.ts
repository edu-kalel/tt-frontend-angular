import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { endpoint } from '../models';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class NutritionistService {

  headers: HttpHeaders | undefined

  constructor(
    private http: HttpClient, private cookie: CookieService,
    private authService: AuthServiceService
  ) { }

  getPatients() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.get(endpoint + '/nutri/patients', { headers })
  }
}
