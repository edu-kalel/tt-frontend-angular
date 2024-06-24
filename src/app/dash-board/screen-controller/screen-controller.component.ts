import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/Services/auth-service.service';
import { NutritionistService } from 'src/app/Services/nutritionist.service';

@Component({
  selector: 'app-screen-controller',
  templateUrl: './screen-controller.component.html',
  styleUrls: ['./screen-controller.component.css']
})
export class ScreenControllerComponent {
  urls: { nombre: string, url: string }[] = [];
  nameUser: string = ''
  mainScreen: string = ''
  navBarBrand: string = ''

  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getRole()
    this.router.navigate([this.mainScreen])
  }

  logout() {
    this.authService.deleteToken()
    this.router.navigate(['/'])
  }

  getRole() {
    const role = this.authService.getRole()
    this.nameUser = this.authService.getName()
    if (role == 'NUTRITIONIST') {
      this.navBarBrand = 'Citas de hoy'
      this.mainScreen = '/dash-board/nutritionist'
      this.urls = [
        { nombre: 'Inicio', url: '/dash-board/nutritionist' },
      ]
    } else if(role == 'NUTRITIONIST_ADMIN') {
      this.navBarBrand = 'Citas de hoy'
      this.mainScreen = '/dash-board/nutritionist'
      this.urls = [
        { nombre: 'Citas para hoy', url: '/dash-board/nutritionist' },
        { nombre: 'Panel de administrador', url: '/dash-board/nutritionist/admin' },
      ]
    } else if (role == 'SECRETARY_ADMIN') {
      this.navBarBrand = 'Usuarios'
      this.mainScreen = '/dash-board/secretary'
      this.urls = [
        { nombre: 'Pacientes', url: '/dash-board/secretary' },
        { nombre: 'Panel de administrador', url: '/dash-board/secretary/admin' },
      ]
    }
  }
}
