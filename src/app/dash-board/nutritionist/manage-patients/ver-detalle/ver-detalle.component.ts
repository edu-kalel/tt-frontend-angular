import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { catchError, subscribeOn, throwError } from 'rxjs';
import { DietByidPlan, PatientRecord, User, UserBasicInfo } from 'src/app/models';
import { NutritionistService } from 'src/app/Services/nutritionist.service';

@Component({
  selector: 'app-ver-detalle',
  templateUrl: './ver-detalle.component.html',
  styleUrls: ['./ver-detalle.component.css']
})
export class VerDetalleComponent {
  @ViewChild('modalDieta', { static: false }) modalDieta?: ModalDirective;
  userBasicInfo: UserBasicInfo | undefined
  email: string | any = ''
  showMessage: boolean = true
  patientRecords: PatientRecord[] = []
  dietList: any[] = []
  posts: any[] = []
  userInfo: User | undefined
  planDieta: DietByidPlan | undefined
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
    private nutriService: NutritionistService,
    private activatedRute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.email = this.activatedRute.snapshot.paramMap.get('emailPaciente')
    this.getBigInfo()
    this.getPatientRecord()
    this.getDietList()
    this.getPost()
    this.getUserInfo()
  }

  getBigInfo() {
    if (this.email) {
      this.nutriService.getPacientBasicInfo(this.email).pipe(
        catchError((error) => {
          if (error instanceof HttpErrorResponse) {
            console.log(error.message)
            switch (error.status) {
              case 403:
                this.showMessage = true
            }
          }
          return throwError(() => new Error("Login failed"));
        })
      ).subscribe((data: UserBasicInfo) => {
        this.showMessage = false
        this.userBasicInfo = data
      })
    }
  }

  getPatientRecord() {
    if (this.email) {
      this.nutriService.getPatientRecord(this.email).pipe()
        .subscribe((data: PatientRecord[]) => {
          this.patientRecords = data
        })
    }
  }

  getDietList() {
    if (this.email) {
      this.nutriService.getPatientDietList(this.email).pipe()
        .subscribe((data: any) => {
          this.dietList = data
        })
    }
  }

  getPost() {
    if (this.email) {
      this.nutriService.getPatientPost(this.email).pipe()
        .subscribe((data: any) => {
          this.posts = data
        })
    }
  }

  getUserInfo() {
    if (this.email) {
      this.nutriService.getUserInfo(this.email).pipe()
        .subscribe((data: User) => {
          this.userInfo = data
        })
    }
  }

  getDietPlan(idPlanDieta: number) {
    this.nutriService.getDietByPlan(idPlanDieta).pipe()
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
