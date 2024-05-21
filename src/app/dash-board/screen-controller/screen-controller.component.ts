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

  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) { }

  ngOnInit() {

  }

  logout() {
    this.authService.deleteToken()
    this.router.navigate(['/login'])
  }

  getRole() {
    const role = this.authService.getRole()
    if (role == 'NUTRITIONIST' || role == 'NUTRITIONIST_ADMIN') {
      this.router.navigate(['dash-board/nutritionist'])
    }
  }
}
