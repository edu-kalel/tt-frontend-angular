import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthServiceService } from './auth-service.service';
import { Observable } from 'rxjs';
import { endpoint, User, UserInfo } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SecretaryService {
  headers: HttpHeaders | undefined

  constructor(
    private http: HttpClient, 
    private authService: AuthServiceService
  ) { }

  getNutritionist(): Observable<UserInfo[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });

    return this.http.get<UserInfo[]>(endpoint + '/secretary/nutritionists', {headers})
  }

  getPatientByNutritionist(emailNutri: string): Observable<UserInfo[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });

    return this.http.get<UserInfo[]>(endpoint + '/secretary/patients-by-nutritionist/' + emailNutri, {headers})
  }

  newPatient(typeEndpoint: string, patient: User){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });

    return this.http.post(endpoint + typeEndpoint, patient, { headers, responseType: 'text' })
  }
}
