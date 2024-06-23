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
  gastoEnergetico: GastoEnergetico | undefined
  isLoading: boolean = true
  isLoading_Porciones: boolean = true
  showInfo: boolean = false
  showInfo_Porciones: boolean = false
  sumaKcal: number = 0
  sumaProteinas: number = 0
  sumaLipidos: number = 0
  sumaCarbohidratos: number = 0
  idPlanDieta: number = 4
  emailPaciente: string = ''
  showDietPlan: boolean = true
  planDieta: DietByidPlan | undefined
  aliments: Aliments | undefined
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
      totalKcal: [1500, Validators.required],
      porcentajeHco: [60, Validators.required],
      porcentajeLip: [20, Validators.required],
      porcentajePro: [20, Validators.required]
    }, { validator: this.percentageSumValidator })
    this.provisional()
    this.getAliments()
  }

  getAliments(){
    this.nutriService.getAliments().pipe()
      .subscribe((data:Aliments) => {
        this.aliments = data
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
    console.log(this.emailPaciente)
    if (this.emailPaciente) {
      this.nutriService.newPlanDiet(this.emailPaciente).pipe()
        .subscribe((data: any) => {
          this.childModal?.hide()
          this.showMessageSucces('Genere el plan de dieta para el paciente')
          this.idPlanDieta = data
          this.nutriService.getDietByPlan(this.idPlanDieta).pipe()
            .subscribe((data: DietByidPlan) => {
              this.planDieta = data
            })
          this.emailPaciente = ''
          this.showDietPlan = true
        })
    }
  }

  provisional() {
    this.nutriService.getDietByPlan(this.idPlanDieta).pipe()
      .subscribe((data: DietByidPlan) => {
        this.planDieta = data
      })
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

  showMessageSucces(message: string) {
    Swal.fire({
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 1500
    })
  }
}
