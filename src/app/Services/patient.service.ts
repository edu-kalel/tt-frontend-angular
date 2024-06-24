import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthServiceService } from './auth-service.service';
import { Observable } from 'rxjs';
import { DietByidPlan, endpoint, User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  headers: HttpHeaders | undefined

  constructor(
    private http: HttpClient, 
    private authService: AuthServiceService
  ) { }

  getPatientDietList(): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.get<any>(endpoint + '/patient/diet-plan-list', {headers})
  }

  getPatientPost(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.get<any>(endpoint + '/patient/posts', {headers})
  }

  getUserInfo(): Observable<User>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.get<User>(endpoint + '/patient/my-info', {headers})
  }

  getDietByPlan(idPlanDieta: number): Observable<DietByidPlan> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });

    return this.http.get<DietByidPlan>(endpoint + '/patient/get-diet-plan-by-id/' + idPlanDieta, {headers})
  }

  newAppointment(appointment: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.post(endpoint + '/patient/appointment', appointment, {headers})
  }

  addComentario(comentario: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.post(endpoint + '/patient/post', comentario, {headers})
  }
}
