import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AppointmentBasicInfo, endpoint } from '../models';
import { AuthServiceService } from './auth-service.service';
import { Observable } from 'rxjs';

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

  getTodayAppointment(): Observable<AppointmentBasicInfo[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.get<AppointmentBasicInfo[]> (endpoint + '/nutri/today-confirmed-appointments', { headers })
  }

  deleteAppointment(appointmentId: number): Observable<string> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.delete(endpoint + '/nutri/delete-appointment/' + appointmentId, { headers, responseType: 'text' })
  }
}
