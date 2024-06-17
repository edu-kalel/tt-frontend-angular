import { Component, Input, OnChanges, SimpleChanges, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalDirective } from "ngx-bootstrap/modal";
import { User } from "src/app/models";
import { AdminService } from "src/app/Services/admin.service";
import { NutritionistService } from "src/app/Services/nutritionist.service";
import Swal from "sweetalert2";

@Component({
    selector: 'new-user',
    template: `
        <button type="button" class="custom-button" (click)="parentModal.show()">{{titulo}}</button>
        <div class="modal fade" bsModal #parentModal="bs-modal" tabindex="-1" role="dialog" aria-labelledby="dialog-nested-name1">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                <div class="modal-header">
                    <h4 id="dialog-nested-name1" class="modal-title pull-left">Registrar {{titulo}}</h4>
                    <button type="button" class="btn-close close pull-right" aria-label="Close" (click)="parentModal.hide()">
                    <span aria-hidden="true" class="visually-hidden">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form (ngSubmit)="saveChanges()" [formGroup]="formRegister">
                        <div class="row justify-content-center">
                            <div class="col col-10">
                                <div class="input-container">
                                    <input type="text" formControlName="first_name" id="nombre" required="">
                                    <label for="nombre" class="label">Nombre(s)</label>
                                    <div class="underline"></div>
                                </div>
                            </div>
                            <div class="col col-10">
                                <div class="input-container">
                                    <input type="text" formControlName="last_name" id="apellidos" required="">
                                    <label for="apellidos" class="label">Apellido(s)</label>
                                    <div class="underline"></div>
                                </div>
                            </div>
                            <div class="col col-10">
                                <div class="input-container">
                                    <input [type]="inputFecha" (focus)="onFocus()" (blur)="onBlur()"
                                        formControlName="date_of_birth" id="fechaNacimiento" required="">
                                    <label for="fechaNacimiento" class="label">Fecha de nacimiento</label>
                                    <div class="underline"></div>
                                </div>
                            </div>
                            <div class="col col-10">
                                <div class="input-container">
                                    <input type="text" formControlName="phone" id="telefono" required="">
                                    <label for="telefono" class="label">Teléfono</label>
                                    <div class="underline"></div>
                                </div>
                            </div>
                            <div class="col col-10">
                                <div class="input-container label-noanimated">
                                    <label class="label" for="sex">Sexo</label>
                                    <select id="sex" class="select-estatus" formControlName="sex">
                                        <option value="MASC">Masculino</option>
                                        <option value="FEM">Femenino</option>
                                    </select>
                                    <div class="underline"></div>
                                </div>
                            </div>
                            <div class="col col-10">
                                <div class="input-container">
                                    <input type="text" formControlName="email" id="email" required="">
                                    <label for="email" class="label">Email</label>
                                    <div class="underline"></div>
                                </div>
                            </div>
                            <div class="col col-10">
                                <div class="input-container">
                                    <input type="password" formControlName="password" id="password" required="">
                                    <label for="password" class="label">Contraseña</label>
                                    <div class="underline"></div>
                                </div>
                            </div>
                            <div class="col col-10" *ngIf="tipoUsuario == 1">
                                <div class="input-container label-noanimated">
                                    <label class="label" for="Rol">Rol</label>
                                    <select id="Rol" class="select-estatus" formControlName="role">
                                        <option *ngFor="let role of roles | keyvalue" [value]="role.key">
                                            {{role.value}}</option>
                                    </select>
                                    <div class="underline"></div>
                                </div>
                            </div>
                            <div class="col col-10" *ngIf="tipoUsuario == 2">
                                <div class="input-container">
                                    <input type="text" formControlName="parent_email" id="parent_email" required="">
                                    <label for="parent_email" class="label">Email de encargado</label>
                                    <div class="underline"></div>
                                </div>
                            </div>
                            <div *ngIf="tipoUsuario != 1"  class="col col-10">
                                <h4>Padecimientos comunes que presenta el paciente</h4>
                                <div class="row mt-3">
                                    <div class="col col-6">
                                        <div class="row">
                                            <div class="col col-2">
                                                <div class="container">
                                                    <input type="checkbox" id="cbx-OVERWEIGHT" (change)="onCheckboxChange($event)" style="display: none;">
                                                    <label for="cbx-OVERWEIGHT" class="check">
                                                        <svg width="18px" height="18px" viewBox="0 0 18 18">
                                                            <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                                                            <polyline points="1 9 7 14 15 4"></polyline>
                                                        </svg>
                                                    </label>
                                                </div>
                                            </div>
                                            <div class="col col-10">
                                                <p>Sobrepeso</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col col-6">
                                        <div class="row">
                                            <div class="col col-2">
                                                <div class="container">
                                                    <input type="checkbox" id="cbx-CARDIAC_PROBLEMS" (change)="onCheckboxChange($event)" style="display: none;">
                                                    <label for="cbx-CARDIAC_PROBLEMS" class="check">
                                                        <svg width="18px" height="18px" viewBox="0 0 18 18">
                                                            <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                                                            <polyline points="1 9 7 14 15 4"></polyline>
                                                        </svg>
                                                    </label>
                                                </div>
                                            </div>
                                            <div class="col col-10">
                                                <p>Problemas cardiacos</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col col-6">
                                        <div class="row">
                                            <div class="col col-2">
                                                <div class="container">
                                                    <input type="checkbox" id="cbx-OBESITY" (change)="onCheckboxChange($event)" style="display: none;">
                                                    <label for="cbx-OBESITY" class="check">
                                                        <svg width="18px" height="18px" viewBox="0 0 18 18">
                                                            <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                                                            <polyline points="1 9 7 14 15 4"></polyline>
                                                        </svg>
                                                    </label>
                                                </div>
                                            </div>
                                            <div class="col col-10">
                                                <p>Obesidad</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col col-6">
                                        <div class="row">
                                            <div class="col col-2">
                                                <div class="container">
                                                    <input type="checkbox" id="cbx-GASTROINTESTINAL_PROBLEMS" (change)="onCheckboxChange($event)" style="display: none;">
                                                    <label for="cbx-GASTROINTESTINAL_PROBLEMS" class="check">
                                                        <svg width="18px" height="18px" viewBox="0 0 18 18">
                                                            <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                                                            <polyline points="1 9 7 14 15 4"></polyline>
                                                        </svg>
                                                    </label>
                                                </div>
                                            </div>
                                            <div class="col col-10">
                                                <p>Problemas gastroinstestinales</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col col-6">
                                        <div class="row">
                                            <div class="col col-2">
                                                <div class="container">
                                                    <input type="checkbox" id="cbx-DIABETES" (change)="onCheckboxChange($event)" style="display: none;">
                                                    <label for="cbx-DIABETES" class="check">
                                                        <svg width="18px" height="18px" viewBox="0 0 18 18">
                                                            <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                                                            <polyline points="1 9 7 14 15 4"></polyline>
                                                        </svg>
                                                    </label>
                                                </div>
                                            </div>
                                            <div class="col col-10">
                                                <p>Diabetes</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col col-6">
                                        <div class="row">
                                            <div class="col col-2">
                                                <div class="container">
                                                    <input type="checkbox" id="cbx-CIRCULATORY_PROBLEMS" (change)="onCheckboxChange($event)" style="display: none;">
                                                    <label for="cbx-CIRCULATORY_PROBLEMS" class="check">
                                                        <svg width="18px" height="18px" viewBox="0 0 18 18">
                                                            <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                                                            <polyline points="1 9 7 14 15 4"></polyline>
                                                        </svg>
                                                    </label>
                                                </div>
                                            </div>
                                            <div class="col col-10">
                                                <p>Problemas de circulación</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col col-6">
                                        <div class="row">
                                            <div class="col col-2">
                                                <div class="container">
                                                    <input type="checkbox" id="cbx-HYPOTHYROIDISM" (change)="onCheckboxChange($event)" style="display: none;">
                                                    <label for="cbx-HYPOTHYROIDISM" class="check">
                                                        <svg width="18px" height="18px" viewBox="0 0 18 18">
                                                            <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                                                            <polyline points="1 9 7 14 15 4"></polyline>
                                                        </svg>
                                                    </label>
                                                </div>
                                            </div>
                                            <div class="col col-10">
                                                <p>Hipotoroidismo</p>
                                            </div>
                                        </div>
                                    </div>                                    
                                    <div class="col col-6">
                                        <div class="row">
                                            <div class="col col-2">
                                                <div class="container">
                                                    <input type="checkbox" id="cbx-DENTAL_PROBLEMS" (change)="onCheckboxChange($event)" style="display: none;">
                                                    <label for="cbx-DENTAL_PROBLEMS " class="check">
                                                        <svg width="18px" height="18px" viewBox="0 0 18 18">
                                                            <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                                                            <polyline points="1 9 7 14 15 4"></polyline>
                                                        </svg>
                                                    </label>
                                                </div>
                                            </div>
                                            <div class="col col-10">
                                                <p>Problemas dentales</p>
                                            </div>
                                        </div>
                                    </div>                        
                                </div>
                            </div>
                            <div class="col col-10">
                                <button type="submit" [disabled]="formRegister.invalid" class="custom-button"> Registrar usuario </button>
                            </div>
                        </div>
                    </form>
                </div>
                </div>
            </div>
        </div>
    `
})

export class NewUserComponent implements OnChanges {
    @ViewChild('parentModal', { static: false }) parentModal?: ModalDirective;
    @Input() titulo: string = ''
    @Input() infoUser: User | undefined
    @Input() modo: number = 0 // 1 para staff y 2 para patient
    @Input() tipoOperacion: string = '0' // 1 para post y 2 para put
    @Input() tipoUsuario: number = 0 // 1 para admin, 2 para secretario y 3 para nutriólogo
    ailments: string[] = []
    formRegister: FormGroup
    inputFecha = 'text'
    selectedMoment = new Date();
    endpoint = ''
    roles = {
        NUTRITIONIST: 'Nutriólogo',
        NUTRITIONIST_ADMIN: 'Nutriólogo administrador',
        SECRETARY: 'Secretario',
        SECRETARY_ADMIN: 'Secretario adminstrador'
    }

    constructor(
        private _form: FormBuilder,
        private adminService: AdminService,
        private nutriService: NutritionistService
    ) {
        this.formRegister = this._form.group({
            email: ['', Validators.required],
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            password: ['', Validators.required],
            date_of_birth: ['', Validators.required],
            phone: ['', Validators.required],
            sex: ['', Validators.required],
            parent_email: [''],
            role: ['']
        })
    }

    registerStaff() {
        if (this.formRegister.valid) {
            console.log(this.formRegister.value)
            this.adminService.newUser(this.endpoint, this.formRegister.value).subscribe(
                (data) => {
                    if (this.parentModal) this.parentModal.hide()
                    this.formRegister.reset()
                    this.showMessageSucces('Registro exitoso');
                }
            )
        }
    }

    registerPatient() {
        if(this.formRegister.valid) {
            let patient:User = this.formRegister.value
            patient.ailments = this.ailments
            this.nutriService.newPatient(this.endpoint, patient).subscribe(
                (data) => {
                    if (this.parentModal) this.parentModal.hide()
                    this.formRegister.reset()
                    this.showMessageSucces('Registro exitoso');
                }
            )
        }
    }

    saveChanges() {
        switch (this.tipoUsuario) {
            case 1:
                this.endpoint = this.tipoOperacion=='1' ? '/admin/new-staff-user' : '/admin/update-staff-user'
                break
            case 2:
                this.endpoint = this.tipoOperacion=='1' ? '/secretary/new-patient' : '/secretary/patient/update'
                break
            case 3:
                this.endpoint = this.tipoOperacion=='1' ? '/nutri/new-patient' :'/nutri/patient/update'
                break
        }
        switch (this.modo) {
            case 1:
                if (this.tipoOperacion == '1') {
                    this.registerStaff()
                } else {

                }
                break
            case 2:
                if (this.tipoOperacion == '1') {
                    this.registerPatient()
                } else {

                }
                break
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes["infoUser"] && changes["infoUser"].currentValue) {
            this.formRegister.setValue({
                email: this.infoUser?.email,
                first_name: this.infoUser?.first_name,
                last_name: this.infoUser?.last_name,
                date_of_birth: this.infoUser?.date_of_birth,
                phone: this.infoUser?.phone,
                sex: this.infoUser?.sex,
                parent_email: this.infoUser?.parent_email,
                role: this.infoUser?.role
            })
        }
    }

    onBlur() {
        const fecha = this.formRegister.get('date_of_birth')?.value
        fecha ? this.inputFecha = 'date' : this.inputFecha = 'text'
    }

    onFocus() {
        this.inputFecha = 'date'
    }

    onCheckboxChange(event: any) {
        const isChecked = event.target.checked;
        const ailment = event.target.id.split('-')[1];
    
        if (isChecked) {
          if (!this.ailments.includes(ailment)) {
            this.ailments.push(ailment);
          }
        } else {
          const index = this.ailments.indexOf(ailment);
          if (index !== -1) {
            this.ailments.splice(index, 1);
          }
        }
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