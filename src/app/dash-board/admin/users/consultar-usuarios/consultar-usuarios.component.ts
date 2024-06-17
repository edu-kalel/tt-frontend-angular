import { Component } from '@angular/core';
import { User } from 'src/app/models';
import { AdminService } from 'src/app/Services/admin.service';
import { AuthServiceService } from 'src/app/Services/auth-service.service';

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
    private authService: AuthServiceService
  ){}

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
}
