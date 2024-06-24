import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ScreenControllerComponent } from './dash-board/screen-controller/screen-controller.component';
import { NutritionistComponent } from './dash-board/nutritionist/nutritionist.component';
import { ManageAppointmentsComponent } from './dash-board/nutritionist/manage-appointments/manage-appointments.component';
import { RegisterComponent } from './register/register.component';
import { UserAdminComponent } from './dash-board/admin/users/users.component';
import { ConsultarUsuariosComponent } from './dash-board/admin/users/consultar-usuarios/consultar-usuarios.component';
import { NewDietComponent } from './dash-board/nutritionist/new-diet/new-diet.component';
import { ManageAppointemntsRecordComponent } from './dash-board/nutritionist/manage-appointemnts-record/manage-appointemnts-record.component';
import { ManagePatientsComponent } from './dash-board/nutritionist/manage-patients/manage-patients.component';
import { ConsultarPacientesComponent } from './dash-board/nutritionist/manage-patients/consultar-pacientes/consultar-pacientes.component';
import { VerDetalleComponent } from './dash-board/nutritionist/manage-patients/ver-detalle/ver-detalle.component';
import { PatientComponent } from './dash-board/patient/patient.component';
import { SecretaryComponent } from './dash-board/secretary/secretary.component';
import { ManageUsersByClinicComponent } from './dash-board/secretary/manage-users-by-clinic/manage-users-by-clinic.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dash-board', component: ScreenControllerComponent, children: [
      {
        path: 'nutritionist', component: NutritionistComponent, children: [
          { path: '', component: ManageAppointmentsComponent } ,
          { path: 'admin', component: UserAdminComponent, children: [
            {path: '', component: ConsultarUsuariosComponent}
          ]},
          { path: 'new-diet', component: NewDietComponent },
          { path: 'appointments', component: ManageAppointemntsRecordComponent },
          { path: 'patients', component: ManagePatientsComponent, children: [
            {path: '', component: ConsultarPacientesComponent},
            {path: 'detail/:emailPaciente', component: VerDetalleComponent},
            {path: 'new-diet', component: NewDietComponent}
          ]}
        ]
      }, {
        path: 'secretary', component: SecretaryComponent, children: [
          { path: '', component: ManageUsersByClinicComponent },
          { path: 'admin', component: UserAdminComponent, children: [
            {path: '', component: ConsultarUsuariosComponent}
          ]}
        ]
      }, 
      {path: 'patient', component: PatientComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
