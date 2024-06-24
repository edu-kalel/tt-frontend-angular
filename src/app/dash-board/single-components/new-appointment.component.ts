import { HttpErrorResponse } from "@angular/common/http";
import { Component, EventEmitter, Output, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalDirective } from "ngx-bootstrap/modal";
import { catchError, throwError } from "rxjs";
import { NutritionistService } from "src/app/Services/nutritionist.service";
import Swal from "sweetalert2";

@Component({
    selector: 'new-appointment',
    template: `
        <button type="button" class="custom-button" (click)="parentModal.show()">Nueva Cita</button>
        <div class="modal fade" bsModal #parentModal="bs-modal" tabindex="-1" role="dialog" aria-labelledby="dialog-nested-name1">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
            <div class="modal-header">
                <h4 id="dialog-nested-name1" class="modal-title pull-left">Agendar cita</h4>
                <button type="button" class="btn-close close pull-right" aria-label="Close" (click)="parentModal.hide()">
                <span aria-hidden="true" class="visually-hidden">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form (ngSubmit)="addApointment()" [formGroup]="formNewAppointment">
                    <div class="row justify-content-center">
                        <div class="col col-10">
                            <div class="input-container">
                                <input type="text" formControlName="email" id="email_p" required="">
                                <label for="email_p" class="label">Email del paciente</label>
                                <div class="underline"></div>
                            </div>
                        </div>
                        <div class="col col-10">
                            <div class="row align-items-center">
                                <div class="col col-6">
                                    <div class="input-container">
                                        <input [type]="inputFecha" (change)="ngOnInit()" (focus)="onFocus()" (blur)="onBlur()"
                                           formControlName="date" id="starting_time" required="">
                                        <label for="starting_time" class="label">Fecha de la cita</label>
                                        <div class="underline"></div>
                                    </div>
                                </div>
                                <div class="col col-3">
                                    <p class="label" style="color: #725AC1">Hora de inicio</p>
                                    <timepicker formControlName='start_hour' (ngModelChange)="changeStartTime()" [showMeridian]="false" [minuteStep]="15"></timepicker>
                                </div>
                                <div class="col col-3">
                                    <p class="label" style="color: #725AC1">Hora de inicio</p>
                                    <timepicker formControlName='end_hour' (ngModelChange)="changeEndTime()" [showMeridian]="false" [minuteStep]="15"></timepicker>
                                </div>
                            </div>
                        </div>
                        <div class="col col-10">
                            <button type="submit" [disabled]="formNewAppointment.invalid" class="custom-button"> Agendar cita </button>
                        </div>
                    </div>
                </form>
            </div>
            </div>
        </div>
        </div>
    `
})

export class NewAppointMentCompoement {
    @ViewChild('parentModal', { static: false }) parentModal?: ModalDirective;
    @Output() reloadAppointments = new EventEmitter<any>();
    formNewAppointment: FormGroup
    selectedMoment = new Date();
    inputFecha = 'text'
    mytime: Date = new Date();

    constructor(
        private _form: FormBuilder,
        private nutriService: NutritionistService
    ) {
        this.formNewAppointment = this._form.group({
            email: ['', Validators.required],
            starting_time: ['', Validators.required],
            ending_date: ['', Validators.required],
            date: ['', Validators.required],
            start_hour: [new Date()],
            end_hour: [new Date()]
        })
    }

    ngOnInit() {
        this.changeStartTime()
        this.changeEndTime()
    }

    addApointment() {
        if (this.formNewAppointment.valid) {
            const newAppointment = {
                patient_email: this.formNewAppointment.get('email')?.value,
                starting_time: this.formNewAppointment.get('starting_time')?.value,
                ending_time: this.formNewAppointment.get('ending_date')?.value,
            }
            this.nutriService.newAppointment(newAppointment).
                pipe(
                    catchError((error) => {
                        if (error instanceof HttpErrorResponse) {
                            console.log(error.message)
                            switch (error.status) {
                                case 409:
                                    this.showErrorMessage("Este paciente ya tiene una cita para el mismo día");
                                    break;
                            }
                        } else {
                            this.showErrorMessage("Error de conexión");
                        }
                        return throwError(() => new Error("Login failed"));
                    })
                ).
                subscribe(
                    (data: any) => {
                        if (this.parentModal) this.parentModal.hide()
                        this.reloadAppointments.emit()
                        this.showMessageSucces(`Cita de ${data.patient} confirmada`)
                    }
                )
        }
    }

    changeStartTime() {
        const start_hour = new Date(this.formNewAppointment.get('start_hour')?.value)
        const start_date = this.formNewAppointment.get('date')?.value
        const hours = start_hour.getHours().toString().padStart(2, '0');
        const minutes = start_hour.getMinutes().toString().padStart(2, '0');
        const seconds = '00.000Z';
        const starting_datetime = `${start_date}T${hours}:${minutes}:${seconds}`;
        this.formNewAppointment.patchValue({
            starting_time: starting_datetime
        })
    }

    changeEndTime() {
        const end_hour = new Date(this.formNewAppointment.get('end_hour')?.value)
        const end_date = this.formNewAppointment.get('date')?.value
        const hours = end_hour.getHours().toString().padStart(2, '0');
        const minutes = end_hour.getMinutes().toString().padStart(2, '0');
        const seconds = '00.000Z';
        const ending_datetime = `${end_date}T${hours}:${minutes}:${seconds}`;
        this.formNewAppointment.patchValue({
            ending_date: ending_datetime
        })
    }

    onBlur() {
        const fecha = this.formNewAppointment.get('date')?.value
        fecha ? this.inputFecha = 'date' : this.inputFecha = 'text'
    }

    onFocus() {
        this.inputFecha = 'date'
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