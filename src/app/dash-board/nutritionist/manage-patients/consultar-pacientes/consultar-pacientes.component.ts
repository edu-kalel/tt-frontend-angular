import { Component } from '@angular/core';
import { Patients } from 'src/app/models';
import { AuthServiceService } from 'src/app/Services/auth-service.service';
import { NutritionistService } from 'src/app/Services/nutritionist.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consultar-pacientes',
  templateUrl: './consultar-pacientes.component.html',
  styleUrls: ['./consultar-pacientes.component.css']
})
export class ConsultarPacientesComponent {
  tipoUser: number = 0
  modo: number = 0
  patients: Patients[] = []
  //modo 1 para staff y 2 para patient
  //tipoOperacion 1 para post y 2 para put
  //tipoUsuario 1 para admin, 2 para secretario y 3 para nutriólogo

  constructor(
    private nutriService: NutritionistService,
    private authService: AuthServiceService
  ) {
    this.setParameters()
  }

  ngOnInit() {
    this.getAllPatients()
  }

  setParameters() {
    const role:string = this.authService.getRole()
    if(role.toLowerCase().includes('nutritionist')){
      this.modo = 2
      this.tipoUser = 3
    } else {
      this.modo = 2
      this.tipoUser = 2
    }
  }

  getAllPatients() {
    this.nutriService.getPatients().pipe()
      .subscribe((data: Patients[]) => {
        this.patients = data
      })
  }

  deletePatient(nameUser: string, email: string) {
    Swal.fire({
      title: "¿Estas seguro?",
      text: `Se eliminará ${nameUser}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#725AC1",
      cancelButtonColor: "red",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.nutriService.deletePatient(email).pipe()
          .subscribe((data) => {
            this.showMessageSucces(data)
            this.getAllPatients()
          })
      }
    });
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
