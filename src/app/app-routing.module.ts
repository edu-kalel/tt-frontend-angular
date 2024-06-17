import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ScreenControllerComponent } from './dash-board/screen-controller/screen-controller.component';
import { NutritionistComponent } from './dash-board/nutritionist/nutritionist.component';
import { ManageAppointmentsComponent } from './dash-board/nutritionist/manage-appointments/manage-appointments.component';
import { RegisterComponent } from './register/register.component';
import { UserAdminComponent } from './dash-board/admin/users/users.component';
import { ConsultarUsuariosComponent } from './dash-board/admin/users/consultar-usuarios/consultar-usuarios.component';


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
          ]}
        ]
      }, {
        path: 'secretary', component: NutritionistComponent, children: [
          { path: '', component: ManageAppointmentsComponent },
          { path: 'admin', component: UserAdminComponent, children: [
            {path: '', component: ConsultarUsuariosComponent}
          ]}
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
