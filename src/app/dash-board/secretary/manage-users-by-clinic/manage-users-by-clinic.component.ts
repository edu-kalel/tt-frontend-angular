import { Component } from '@angular/core';
import { UserInfo } from 'src/app/models';
import { AuthServiceService } from 'src/app/Services/auth-service.service';
import { SecretaryService } from 'src/app/Services/secretary.service';

@Component({
  selector: 'app-manage-users-by-clinic',
  templateUrl: './manage-users-by-clinic.component.html',
  styleUrls: ['./manage-users-by-clinic.component.css']
})
export class ManageUsersByClinicComponent {
  nutris: UserInfo[] = []
  tipoUser = 0
  modo = 0

  constructor(
    private secreService: SecretaryService,
    private authService: AuthServiceService
  ){}

  ngOnInit(){
    this.setParams()
  }

  setParams() {
    const role:string = this.authService.getRole()
    if(role.toLowerCase().includes('nutritionist')){
      this.modo = 2
      this.tipoUser = 3
    } else {
      this.modo = 2
      this.tipoUser = 2
    }
  }

  getNutris() {
    this.secreService.getNutritionist().pipe()
      .subscribe((data: UserInfo[]) => {
        this.nutris = data
      })
  }
}
