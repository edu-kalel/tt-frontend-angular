import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Aliments, AppointmentBasicInfo, DietByidPlan, endpoint, GastoEnergetico, NutriCards, PorcionesComida, User } from '../models';
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

  getCards(): Observable<NutriCards[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.get<NutriCards[]>(endpoint + '/nutri/cards', {headers})
  }

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

  newAppointment(appointment: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.post(endpoint + '/nutri/appointment', appointment, {headers})
  }

  deleteAppointment(appointmentId: number): Observable<string> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.delete(endpoint + '/nutri/appointment/delete/' + appointmentId, { headers, responseType: 'text' })
  }

  newPatient(typeEndpoint: string, patient: User){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });

    return this.http.post(endpoint + typeEndpoint, patient, { headers, responseType: 'text' })
  }

  patientRecord(patientRecord: any): Observable<GastoEnergetico> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.post<GastoEnergetico>(endpoint + '/nutri/patient-record', patientRecord ,{headers})
  }

  calculatePortions(values: any): Observable<PorcionesComida> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });

    return this.http.post<PorcionesComida>(endpoint + '/nutri/calculate-portions', values, {headers})
  }

  newPlanDiet(emailPaciente: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });

    return this.http.post(endpoint + '/nutri/diet-plan/new/' + emailPaciente, null, {headers, responseType: 'text'})
  }

  getDietByPlan(idPlanDieta: number): Observable<DietByidPlan> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });

    return this.http.get<DietByidPlan>(endpoint + '/nutri/get-diet-plan-by-id/' + idPlanDieta, {headers})
  }

  getAliments(): Observable<Aliments[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });

    return this.http.get<Aliments[]>(endpoint + '/nutri/diet-plan/get-all-aliments', {headers})
  }

  addMealsToDietPlan(mealsPlan: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });

    return this.http.post(endpoint + '/nutri/diet-plan/add-meals', mealsPlan, {headers, responseType: 'text'})
  }

  finishDietPlan(dietPlan: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });

    return this.http.put(endpoint + '/nutri/diet-plan/finish', dietPlan, {headers, responseType: 'text'})
  }

  getAppointmentsConfirmed(): Observable<AppointmentBasicInfo[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });

    return this.http.get<AppointmentBasicInfo[]>(endpoint + '/nutri/appointments/confirmed', {headers})
  }

  getAppointmentsSolicited(): Observable<AppointmentBasicInfo[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });

    return this.http.get<AppointmentBasicInfo[]>(endpoint + '/nutri/appointments/solicited', {headers})
  }

  confirmAppointment(idCita: number) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });

    return this.http.put(endpoint + '/nutri/appointment/confirm/' + idCita , null, {headers, responseType: 'text'} )
  }
}
