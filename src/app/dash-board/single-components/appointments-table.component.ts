import { Component, EventEmitter, Input, Output } from "@angular/core";
import { AppointmentBasicInfo } from "src/app/models";
import { NutritionistService } from "src/app/Services/nutritionist.service";
import Swal from "sweetalert2";

@Component({
    selector: 'appointment-table',
    template: `
        <div class="row mt-3">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">
                            <p class="fs-4">{{title}}</p>
                        </th>
                    </tr>
                    <tr>
                        <th>Paciente</th>
                        <th>Fecha y hora</th>
                        <th>
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody class="table-group-divider">
                    <tr *ngFor="let appointment of appointments">
                        <td>{{appointment.patient}}</td>
                        <td>{{convertTo24HourFormat(appointment.starting_time)}}</td>
                        <td>
                            <div class="row d-flex justify-content-center">
                                <div class="col col-6" *ngIf="actions">
                                    <button class="btn" style="
                                        --bs-btn-bg: #725AC1; 
                                        --bs-btn-color: #fff; 
                                        --bs-btn-border-color: #725AC1;
                                        --bs-btn-hover-bg: #fff;
                                        --bs-btn-hover-color: #725AC1;
                                        --bs-btn-hover-border-color: #725AC1;
                                    " (click)="confirmarCita(appointment.id_appointment)">
                                        Confirmar
                                    </button>
                                </div>
                                <div class="col col-6">
                                    <button class="btn btn-danger" style="
                                        --bs-btn-hover-bg: #fff;
                                        --bs-btn-hover-color: red;
                                        --bs-btn-hover-border-color: red;
                                    " (click)="cancelarCita(appointment.id_appointment)">
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    `
})

export class AppointmentTableComponent {
    @Input() appointments: AppointmentBasicInfo[] = []
    @Input() actions: boolean = false
    @Input() title: string = ''
    @Output() reloadAppointments = new EventEmitter<any>();

    constructor(
        private nutriService: NutritionistService
    ) { }

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

    confirmarCita(idCita: number){
        this.nutriService.confirmAppointment(idCita).pipe()
            .subscribe((data) => {
                this.showMessageSucces(data)
                this.reloadAppointments.emit()
            })
    }

    cancelarCita(idCita: number) {
        this.nutriService.deleteAppointment(idCita).pipe()
            .subscribe((data) => {
                this.showMessageSucces(data)
                this.reloadAppointments.emit()
            })
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
            confirmButtonColor: "#725AC1",
            confirmButtonText: "Aceptar",
        })
    }
}