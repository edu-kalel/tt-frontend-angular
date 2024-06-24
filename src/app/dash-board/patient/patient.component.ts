import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { catchError, throwError } from 'rxjs';
import { UserBasicInfo, PatientRecord, User, DietByidPlan } from 'src/app/models';
import { AuthServiceService } from 'src/app/Services/auth-service.service';
import { NutritionistService } from 'src/app/Services/nutritionist.service';
import { PatientService } from 'src/app/Services/patient.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent {
  @ViewChild('modalDieta', { static: false }) modalDieta?: ModalDirective;
  userBasicInfo: UserBasicInfo | undefined
  email: string | any = ''
  showMessage: boolean = true
  patientRecords: PatientRecord[] = []
  dietList: any[] = []
  posts: any[] = []
  userInfo: User | undefined
  planDieta: DietByidPlan | undefined
  comentario: string = ''
  healthConditions = {
    OVERWEIGHT: 'Sobrepeso',
    OBESITY: 'Obesidad',
    DIABETES: 'Diabetes',
    HYPOTHYROIDISM: 'Hipotiroidismo',
    CARDIAC_PROBLEMS: 'Problemas cardíacos',
    GASTROINTESTINAL_PROBLEMS: 'Problemas gastrointestinales',
    SKIN_PROBLEMS: 'Problemas de la piel',
    CIRCULATORY_PROBLEMS: 'Problemas circulatorios',
    DENTAL_PROBLEMS: 'Problemas dentales'
  }

  constructor(
    private patientService: PatientService,
    private authService: AuthServiceService
  ) { }

  ngOnInit() {
    this.email = this.authService.getEmail()
    this.getDietList()
    this.getPost()
    this.getUserInfo()
    this.showMessage = false
  }

  getDietList() {
    this.patientService.getPatientDietList().pipe()
      .subscribe((data: any) => {
        this.dietList = data
      })
  }

  getPost() {
    this.patientService.getPatientPost().pipe()
      .subscribe((data: any) => {
        this.posts = data
      })
  }

  getUserInfo() {
    this.patientService.getUserInfo().pipe()
      .subscribe((data: User) => {
        this.userInfo = data
      })
  }

  getDietPlan(idPlanDieta: number) {
    this.patientService.getDietByPlan(idPlanDieta).pipe()
      .subscribe((data: DietByidPlan) => {
        this.planDieta = data
      })
  }

  getDietById(idPlanDieta: number) {
    this.modalDieta?.show()
    this.getDietPlan(idPlanDieta)
  }

  getHealthCondition(key: string): string {
    return this.healthConditions[key as keyof typeof this.healthConditions] || 'Condition not found';
  }

  enviarComentario() {
    if(this.comentario.length >= 5){
      this.patientService.addComentario(this.comentario).pipe()
        .subscribe((data) => {
          this.getPost()
          this.comentario = ''
        })
    }
  }

  convertToDDMMYY(dateString: string | any): string {
    const date = new Date(dateString);

    const day = this.padZero(date.getDate());
    const month = this.padZero(date.getMonth() + 1);
    const year = date.getFullYear().toString().slice(-2);

    return `${day}/${month}/${year}`;
  }

  convertTo24HourFormat(dateTime: string): string {
    const date = new Date(dateTime);
    const day = this.padZero(date.getDate());
    const month = this.padZero(date.getMonth() + 1);
    const year = date.getFullYear();
    const hours = this.padZero(date.getHours());
    const minutes = this.padZero(date.getMinutes());

    return `${day}/${month}/${year} ${hours}:${minutes} hrs.`;
  }

  padZero(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

  transformString(alimentos: string | any): string[] | any {
    if (alimentos) {
      return alimentos.split('. ').filter((item: any) => item);
    }
  }
}
