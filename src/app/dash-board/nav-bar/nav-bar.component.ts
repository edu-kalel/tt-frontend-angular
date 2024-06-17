import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/Services/auth-service.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  @Input() urls: { nombre: string, url: string }[] = [];
  @Input() nameUser: string = ''
  @Input() navBarBrand = 'Proyecto TT'

  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) { }

  logOut() {
    this.authService.deleteToken()
    this.router.navigate(['/'])
  }

  setItemName(itemName: string) {
    this.navBarBrand = itemName;
  }
}
