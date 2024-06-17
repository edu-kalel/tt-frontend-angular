import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../Services/auth-service.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


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
      clinic:  ['', Validators.required],
      first_name:  ['', Validators.required],
      last_name:  ['', Validators.required],
      password:  ['', Validators.required],
      date_of_birth:  ['', Validators.required],
      phone:['', Validators.required],
      sex:  ['', Validators.required],
      role:  ['', Validators.required]
    })
  }

  register() {
    if(this.formRegister.valid) {
      console.log(this.formRegister.value)
      this.autService.register(this.formRegister.value).subscribe(
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
}
