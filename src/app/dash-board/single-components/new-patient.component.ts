import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'new-patient',
    template: `
        <button type=button class=custom-button (click)=parentModal.show()>Nueva Cita</button>
        <div class=modal fade bsModal #parentModal=bs-modal tabindex=-1 role=dialog aria-labelledby=dialog-nested-name1>
        <div class=modal-dialog modal-lg>
            <div class=modal-content>
            <div class=modal-header>
                <h4 id=dialog-nested-name1 class=modal-title pull-left>Agendar cita</h4>
                <button type=button class=btn-close close pull-right aria-label=Close (click)=parentModal.hide()>
                <span aria-hidden=true class=visually-hidden>&times;</span>
                </button>
            </div>
            <div class=modal-body>
                <form action=>
                    <div class=row>
                        <div class=col col-10>
                        <label>Date Time(binding via ngModel):</label>
                        </div>
                    </div>
                </form>
            </div>
            </div>
        </div>
        </div>
    `
})

export class NewPatientComponent {

    formPatient: FormGroup
    selectedMoment = new Date();

    constructor(
        private _form: FormBuilder
    ) {
        this.formPatient = this._form.group({
            email: ['', Validators.required],
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            password: ['', Validators.required],
            date_of_birth: ['', Validators.required],
            phone: ['', Validators.required],
            sex: ['', Validators.required],
            ailments: [Validators.required]
        })
    }

}