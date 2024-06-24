import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models';
import { AdminService } from 'src/app/Services/admin.service';
import { AuthServiceService } from 'src/app/Services/auth-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consultar-usuarios',
  templateUrl: './consultar-usuarios.component.html',
  styleUrls: ['./consultar-usuarios.component.css']
})
export class ConsultarUsuariosComponent {
  usersStaff: User[] = []
  modo: number = 1
  tipoUser: number = 1
  roles: { [key: string]: string } = {
    NUTRITIONIST_ADMIN: 'Nutriólogo administrador',
    SECRETARY_ADMIN: 'Secretario adminstrador',
    NUTRITIONIST: 'Nutriólogo',
    SECRETARY: 'Secretario'
  }

  constructor(
    private adminService: AdminService,
    private authService: AuthServiceService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getAllUsersStaff()
  }

  getAllUsersStaff() {
    this.adminService.getAllUsersStaff().subscribe(
      (data: User[]) => {
        this.usersStaff = data
      }
    )
  }

  getRole(rol: string): string {
    return this.roles[rol]
  }

  deleteStaffUser(nameUser: string, email: string) {
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
        const emailUser = this.authService.getEmail()
        this.adminService.deleteStaffUser(email).pipe()
          .subscribe((data) => {
            this.showMessageSucces(data)
            this.getAllUsersStaff()
            if(emailUser == email){
              this.authService.deteleAllCookies()
              this.router.navigate(['/'])
            }
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
