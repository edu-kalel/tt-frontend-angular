import { Component, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Aliments, DietByidPlan, GastoEnergetico, PorcionesComida } from 'src/app/models';
import { NutritionistService } from 'src/app/Services/nutritionist.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-diet',
  templateUrl: './new-diet.component.html',
  styleUrls: ['./new-diet.component.css']
})
export class NewDietComponent {
  @ViewChild('childModal', { static: false }) childModal?: ModalDirective;
  @ViewChild('dietaModal', { static: false }) dietaModal?: ModalDirective;
  activityLevel = {
    SEDENTARY: 'Sedentario',
    LIGHT: 'Ligero',
    MODERATED: 'Moderado',
    INTENSE: 'Intenso'
  }
  formGastoEnergetico: FormGroup
  formCalculoPorciones: FormGroup
  formFinishDietPlan: FormGroup
  gastoEnergetico: GastoEnergetico | undefined
  isLoading: boolean = true
  isLoading_Porciones: boolean = true
  showInfo: boolean = false
  showInfo_Porciones: boolean = false
  sumaKcal: number = 0
  sumaProteinas: number = 0
  sumaLipidos: number = 0
  sumaCarbohidratos: number = 0
  idPlanDieta: number = 0
  emailPaciente: string = ''
  showDietPlan: boolean = false
  planDieta: DietByidPlan | undefined
  aliments: Aliments[] = []
  groups: string[] = []
  porciones: { [key: string]: number } = {
    verduras: 0,
    frutas: 0,
    cereales: 0,
    cerealesConGrasa: 0,
    leguminosas: 0,
    alimentosDeOrigenAnimalMuyBajosEnGrasa: 0,
    alimentosDeOrigenAnimalBajosEnGrasa: 0,
    alimentosDeOrigenAnimalModeradosEnGrasa: 0,
    alimentosDeOrigenAnimalAltoContenidoDeGrasa: 0,
    lecheDescremada: 0,
    grasas: 0,
    grasasConProteina: 0,
    azucares: 0,
    azucaresConGrasa: 0,
    lecheEntera: 0,
    sumaKcal: 0,
    sumaProteinas: 0,
    sumaLipidos: 0,
    sumaCarbohidratos: 0
  };

  constructor(
    private _form: FormBuilder,
    private nutriService: NutritionistService
  ) {
    this.formGastoEnergetico = this._form.group({
      patientEmail: ['', Validators.required],
      patientHeight: [0, Validators.required],
      patientWeight: [0, Validators.required],
      activityLevel: [Validators.required]
    })
    this.formCalculoPorciones = this._form.group({
      totalKcal: [0, Validators.required],
      porcentajeHco: [0, Validators.required],
      porcentajeLip: [0, Validators.required],
      porcentajePro: [0, Validators.required]
    }, { validator: this.percentageSumValidator })
    this.formFinishDietPlan = this._form.group({
      id: 0,
      goal: ['', Validators.required],
      comment: ['', Validators.required]
    })
    this.getAliments()
  }

  getAliments() {
    this.nutriService.getAliments().pipe()
      .subscribe((data: Aliments[]) => {
        this.aliments = data
        this.buildGruops()
      })
  }

  calcularGE() {
    this.isLoading = true
    this.showInfo = true
    this.nutriService.patientRecord(this.formGastoEnergetico.value).pipe()
      .subscribe((data: GastoEnergetico) => {
        this.gastoEnergetico = data
        setTimeout(() => { }, 2000)
        this.isLoading = false
      })
  }

  calcularPorciones() {
    this.isLoading_Porciones = true
    this.showInfo_Porciones = true
    this.nutriService.calculatePortions(this.formCalculoPorciones.value)
      .subscribe((data: any) => {
        this.porciones = data
        this.sumaKcal = this.porciones['sumaKcal']
        this.sumaProteinas = this.porciones['sumaProteinas']
        this.sumaLipidos = this.porciones['sumaLipidos']
        this.sumaCarbohidratos = this.porciones['sumaCarbohidratos']
        delete this.porciones['sumaKcal']
        delete this.porciones['sumaProteinas']
        delete this.porciones['sumaLipidos']
        delete this.porciones['sumaCarbohidratos']
        this.isLoading_Porciones = false
      })
  }

  crearPlanDieta() {
    if (this.emailPaciente) {
      this.nutriService.newPlanDiet(this.emailPaciente).pipe()
        .subscribe((data: any) => {
          this.childModal?.hide()
          this.showMessageSucces('Genere el plan de dieta para el paciente')
          this.idPlanDieta = data
          this.getDietPlan();
          this.emailPaciente = ''
          this.showDietPlan = true
        })
    }
  }

  getDietPlan() {
    this.nutriService.getDietByPlan(this.idPlanDieta).pipe()
      .subscribe((data: DietByidPlan) => {
        this.planDieta = data
        this.idPlanDieta = data.id
        this.formFinishDietPlan.patchValue({
          goal: this.planDieta.goal ? this.planDieta.goal : '',
          comment: this.planDieta.comment ? this.planDieta.comment : ''
        })
      })
  }

  finishDietPlan() {
    if (this.formFinishDietPlan.valid) {
      this.formFinishDietPlan.patchValue({
        id: this.idPlanDieta
      })
      this.nutriService.finishDietPlan(this.formFinishDietPlan.value).pipe()
        .subscribe((data) => {
          this.showMessageSucces(data)
        })
    }
  }

  percentageSumValidator(control: AbstractControl): ValidationErrors | null {
    const porcentajeHco = control.get('porcentajeHco');
    const porcentajeLip = control.get('porcentajeLip');
    const porcentajePro = control.get('porcentajePro');

    if (!porcentajeHco || !porcentajeLip || !porcentajePro) {
      return null;
    }
    const sum = porcentajeHco.value + porcentajeLip.value + porcentajePro.value;
    return sum === 100 ? null : { percentageSum: true };
  }

  transformKey(key: string): string {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .replace(/\b[a-z]/g, match => match.toUpperCase())
      .trim();
  }

  transformString(alimentos: string | any): string[] | any {
    if (alimentos) {
      return alimentos.split('. ').filter((item: any) => item);
    }
  }

  buildGruops() {
    const auxGroups: Set<string> = new Set()
    this.aliments.forEach(aliment => auxGroups.add(aliment.group))
    this.groups = Array.from(auxGroups)
  }

  showMessageSucces(message: string) {
    Swal.fire({
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 1500
    })
  }
}
