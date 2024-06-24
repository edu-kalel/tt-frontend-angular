import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../Services/auth-service.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  formRegister: FormGroup
  inputFecha = 'text'
  roles = {
    NUTRITIONIST_ADMIN: 'Nutriólogo administrador',
    SECRETARY_ADMIN: 'Secretario adminstrador'
  }

  constructor(
    private _form: FormBuilder,
    private autService: AuthServiceService,
    private router: Router
  ) {
    this.formRegister = this._form.group({
      email: ['', Validators.required],
      clinic: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      password: ['', Validators.required],
      date_of_birth: ['', Validators.required],
      phone: ['', Validators.required],
      sex: ['', Validators.required],
      role: ['', Validators.required]
    })
  }

  register() {
    if (this.formRegister.valid) {
      this.autService.register(this.formRegister.value).pipe(
        catchError((error) => {
          if (error instanceof HttpErrorResponse) {
            console.log(error.message)
            switch (error.status) {
              case 409:
                this.showErrorMessage("La clínica ya está registrada");
            }
          } else {
            this.showErrorMessage("Error de conexión");
          }
          return throwError(() => new Error("Login failed"));
        })
      ).subscribe(
        (data) => {
          this.showMessageSucces('Registro exitoso');
          this.router.navigate(["/"]);
        }
      )
    }
  }

  onBlur() {
    const fecha = this.formRegister.get('date_of_birth')?.value
    fecha ? this.inputFecha = 'date' : this.inputFecha = 'text'
  }

  onFocus() {
    this.inputFecha = 'date'
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
      confirmButtonColor: "#725AC1",
      confirmButtonText: "Aceptar",
    })
  }
}
