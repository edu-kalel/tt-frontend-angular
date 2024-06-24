import { Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { ModalDirective } from "ngx-bootstrap/modal";
import { Aliments, Meal } from "src/app/models";
import { NutritionistService } from "src/app/Services/nutritionist.service";
import Swal from "sweetalert2";

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
                        <h3>Filtros de comida</h3>
                        <div class="row">
                            <div class="col col-5">
                                <div class="input-container">
                                    <input type="text" id="nombre" required="" [(ngModel)]="nameAliment">
                                    <label for="nombre" class="label">Nombre del alimento</label>
                                    <div class="underline"></div>
                                </div>
                            </div>
                            <div class="col col-5">
                                <div class="input-container label-noanimated">
                                    <label class="label" for="Rol">Grupo</label>
                                    <select id="Rol" class="select-estatus" [(ngModel)]="groupAliment">
                                        <option *ngFor="let grupo of groups" [value]="grupo">
                                            {{grupo}}</option>
                                    </select>
                                    <div class="underline"></div>
                                </div>
                            </div>
                            <div class="col col-2">
                                <button type="button" (click)="clearParams()" class="btn btn-primary" style="
                                    --bs-btn-bg: #725AC1; 
                                    --bs-btn-border-color: #725AC1;
                                    --bs-btn-hover-bg: #fff;
                                    --bs-btn-hover-color: #000
                                ">Limpiar</button>
                            </div>
                        </div>
                        <div style="height: 60vh; overflow: auto;">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Porciones</th>
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
                                    <tr *ngFor="let alimento of filterByParams(aliments, nameAliment, groupAliment)">
                                        <th>
                                            <div class="input-container">
                                                <input type="number" id="aliment-{{alimento.id}}" [min]="0" [value]="alimento.cantidad" (change)="addMeal($event, alimento.id)">
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
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" (click)="parentModal.hide()">Cancelar</button>
                        <button type="button" (click)="addMealTime()" class="btn btn-primary" style="
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
    @ViewChild('parentModal', { static: false }) parentModal?: ModalDirective;
    @Output() actualizarPlan = new EventEmitter<any>();
    @Input() dietPlanId: number = 0
    @Input() mealTime: string = ''
    @Input() dietOption: string = ''
    @Input() titulo: string = ''
    @Input() aliments: Aliments[] = []
    @Input() groups: string[] = []
    meals: Meal[] = []
    groupAliment: string = ''
    nameAliment: string = ''

    constructor(
        private nutriService: NutritionistService
    ){ }

    addMealTime(){
        if(this.meals){
            const mealTime = {
                dietPlanId: this.dietPlanId,
                mealTime: this.mealTime,
                dietOption: this.dietOption,
                meals: this.meals
            }
            this.nutriService.addMealsToDietPlan(mealTime).pipe()
                .subscribe((data) => {
                    this.meals = []
                    this.showMessageSucces('Alimentos agregados correctamente')
                    this.actualizarPlan.emit()
                    this.parentModal?.hide()
                })
        } else {
            this.showErrorMessage('Agrege al menos un alimento');
        }
    }

    clearParams() {
        this.nameAliment = ''
        this.groupAliment = ''
    }

    filterByParams(aliments: Aliments[], nombre: string, group: string): Aliments[] {
        nombre = nombre.toLowerCase()
        group = group.toLowerCase()
        if((group || nombre.length >=3 ) && aliments){
            return aliments.filter(
                (aliment) => 
                    aliment.name.toLowerCase().includes(nombre) &&
                    aliment.group.toLowerCase().includes(group)
            )
        } else if(aliments){

            return aliments
        } 
         
        return []
    }

    addMeal(event: Event, idAlimento: number) {
        const cantidad = event.target as HTMLInputElement
        const mealIndex = this.meals.findIndex((meal: { alimentId: number; }) => meal.alimentId === idAlimento);
        const alimentIndex = this.aliments.findIndex((meal) => meal.id === idAlimento)
        
        if(mealIndex !== -1){
            this.meals[mealIndex].quantity = Number(cantidad.value)
        } else {
            this.meals.push({
                alimentId: idAlimento,
                quantity: Number(cantidad.value)
            })
        }    
        this.aliments[alimentIndex].cantidad = Number(cantidad.value)
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
}