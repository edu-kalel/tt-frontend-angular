import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'new-appointment',
    template: `
        <button type="button" class="custom-button" (click)="parentModal.show()">Nueva Cita</button>
        <div class="modal fade" bsModal #parentModal="bs-modal" tabindex="-1" role="dialog" aria-labelledby="dialog-nested-name1">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
            <div class="modal-header">
                <h4 id="dialog-nested-name1" class="modal-title pull-left">Agendar cita</h4>
                <button type="button" class="btn-close close pull-right" aria-label="Close" (click)="parentModal.hide()">
                <span aria-hidden="true" class="visually-hidden">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form action="">
                    <div class="row">
                        <div class="col col-10">
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

export class NewAppointMentCompoement {

    formNewAppointment: FormGroup
    selectedMoment = new Date();

    constructor(
        private _form: FormBuilder
    ) {
        this.formNewAppointment = this._form.group({
            email: ['', Validators.required],
            starting_time: ['', Validators.required],
            ending_date: ['', Validators.required]
        })
    }


}