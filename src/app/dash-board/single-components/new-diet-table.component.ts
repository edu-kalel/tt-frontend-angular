import { Component, Input } from "@angular/core";
import { Aliments } from "src/app/models";

@Component({
    selector: 'new-diet-table',
    template: `
        <button type="button" class="custom-button" (click)="parentModal.show()">
            <i class="fa-solid fa-bowl-food"></i>
            Agregar alimentos
        </button>
        <div class="modal fade" bsModal #parentModal="bs-modal" tabindex="-1" role="dialog" aria-labelledby="dialog-nested-name1">
            <div class="modal-dialog modal-xl modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 id="dialog-nested-name1" class="modal-title pull-left">{{titulo}}</h4>
                        <button type="button" class="btn-close close pull-right" aria-label="Close" (click)="parentModal.hide()">
                        </button>
                    </div>
                    <div class="modal-body">
                        <div style="height: 60vh; overflow: auto;">
                            <div>
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col"></th>
                                            <th scope="col">Nombre</th>
                                            <th scope="col">Grupo</th>
                                            <th scope="col">Cantidad</th>
                                            <th scope="col">Unidad</th>
                                            <th scope="col">Kcal</th>
                                            <th scope="col">Carbohidratos</th>
                                            <th scope="col">Grasas</th>
                                            <th scope="col">Proteínas</th>
                                        </tr>
                                    </thead>
                                    <tbody class="table-group-divider">
                                        <tr *ngFor="let alimento of aliments">
                                            <th>
                                                <div class="input-container">
                                                    <input type="number" [value]="0" id="porcentajeHco" required="">
                                                    <div class="underline"></div>
                                                </div>
                                            </th>
                                            <th scope="row">{{alimento.name}}</th>
                                            <td>{{alimento.group}}</td>
                                            <td>{{alimento.quantity}}</td>
                                            <td>{{alimento.unit}}</td>
                                            <td>{{alimento.kcal}}</td>
                                            <td>{{alimento.carbs}}</td>
                                            <td>{{alimento.fats}}</td>
                                            <td>{{alimento.proteins}}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" (click)="parentModal.hide()">Cancelar</button>
                        <button type="button" class="btn btn-primary" style="
                                --bs-btn-bg: #725AC1; 
                                --bs-btn-border-color: #725AC1;
                                --bs-btn-hover-bg: #fff;
                                --bs-btn-hover-color: #000
                            ">Crear</button>
                    </div>
                </div>
            </div>
        </div>
    `
})

export class NewDietTableComponent {
    @Input() dietPlanId: number = 0
    @Input() mealTime: string = ''
    @Input() dietOption: string = ''
    @Input() titulo: string = ''
    @Input() aliments: Aliments | any

    constructor(){
        
    }

}