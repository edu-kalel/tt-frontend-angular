import { DecimalPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Directive, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthServiceService } from 'src/app/Services/auth-service.service';
import { NutritionistService } from 'src/app/Services/nutritionist.service';
import { AppointmentBasicInfo } from 'src/app/models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-appointments',
  templateUrl: './manage-appointments.component.html',
  styleUrls: ['./manage-appointments.component.css']
})
export class ManageAppointmentsComponent {
  fecha: string = 'Fecha de hoy'
  appointmentsToday: AppointmentBasicInfo[] = []
  modo: number = 2
  tipoUser: number = 0

  constructor(
    private nutritionistService: NutritionistService,
    private authService: AuthServiceService
  ) { }

  ngOnInit() {
    this.getTodayAppointments()
  }

  getTodayAppointments() {
    this.nutritionistService.getTodayAppointment().pipe()
      .subscribe((data: AppointmentBasicInfo[]) => {
        this.appointmentsToday = data
      })
  }

  setParameters() {
    const role = this.authService.getRole()
    this.tipoUser = role == 'NUTRITIONIST' ||  role == 'NUTRITIONIST_ADMIN' ? 3 : 2
  }

  cancelAppointment(userName: string, id: number) {
    Swal.fire({
      title: "¿Estas seguro?",
      text: `Se cancelará la cita de ${userName}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000",
      cancelButtonColor: "#6E1300",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.showLoadingMessage(true, 'Eliminando');
        this.nutritionistService.deleteAppointment(id).
          pipe(
            catchError((error) => {
              if (error instanceof HttpErrorResponse) {
                console.log(error.message)
                switch (error.status) {
                  case 401:
                    this.showErrorMessage("Credenciales inválidas");
                    break;
                  case 404:
                    this.showErrorMessage("El usuario no existe");
                    break;
                  case 500:
                    this.showErrorMessage("Error en el servidor, intente más tarde");
                    break;
                  default:
                    this.showErrorMessage("Error inesperado");
                }
              } else {
                this.showErrorMessage("Error de conexión");
              }
              return throwError(() => new Error("Login failed"));
            })
          ). //Obtiene los errores de la solicitud
              subscribe((data: string) => {
                this.showLoadingMessage(false, '');
                this.showMessageSucces(data);
                this.getTodayAppointments();
              })
        }
    });
  }

  convertTo24HourFormat(isoString: string): string {
    const date = new Date(isoString);
    const hours = this.padZero(date.getUTCHours());
    const minutes = this.padZero(date.getUTCMinutes());
    const seconds = this.padZero(date.getUTCSeconds());
    return `${hours}:${minutes} hrs.`;
  }

  padZero(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

  showMessageSucces(message: string) {
    Swal.fire({
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 1500
    })
  }

  showErrorMessage(message: string) {
    Swal.fire({
      icon: 'error',
      title: message,
      confirmButtonColor: "#000",
      confirmButtonText: "Aceptar",
    })
  }

  showLoadingMessage(flag: boolean, title: string) {
    if (flag) {
      Swal.fire({
        title: title,
        didOpen: () => {
          Swal.disableButtons()
          Swal.showLoading()
        }
      })
    }
  }
}
