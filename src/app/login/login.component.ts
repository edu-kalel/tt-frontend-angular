import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../Services/auth-service.service';
import { authInfo } from '../models';
import { authToken } from '../models/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formLogin: FormGroup

  constructor(
    private _form: FormBuilder,
    private authService: AuthServiceService,
    private router: Router
  ) {
    this.formLogin = this._form.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login() {
    if (this.formLogin.valid) {
      const infoLogin: authInfo = this.formLogin.value
      this.authService.login(infoLogin).pipe().subscribe((data: authToken) => {
        this.authService.setToken(data.token)
        this.authService.setRole(data.role)
        this.authService.setName(data.name)
        this.router.navigate(['dash-board'])
      })
    }
  }
}
