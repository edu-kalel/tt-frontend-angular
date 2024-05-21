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
  mainScreen: string = ''

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
    this.router.navigate(['/login'])
  }

  getRole() {
    const role = this.authService.getRole()
    if (role == 'NUTRITIONIST' || role == 'NUTRITIONIST_ADMIN') {
      this.mainScreen = '/dash-board/nutritionist'
      this.urls = [
        { nombre: 'Pacientes', url: '/dash-board/nutritionist' },
      ]
    }
  }
}
