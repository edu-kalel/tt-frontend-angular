import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from "ngx-cookie-service";
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { ScreenControllerComponent } from './dash-board/screen-controller/screen-controller.component';
import { NutritionistComponent } from './dash-board/nutritionist/nutritionist.component';
import { NavBarComponent } from './dash-board/nav-bar/nav-bar.component';
import { ManageAppointmentsComponent,  } from './dash-board/nutritionist/manage-appointments/manage-appointments.component';
import { DecimalPipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewAppointMentCompoement } from './dash-board/single-components/new-appointment.component';
import { NewUserComponent } from './dash-board/single-components/new-user.component';
import { RegisterComponent } from './register/register.component';
import { UserAdminComponent } from './dash-board/admin/users/users.component';
import { ConsultarUsuariosComponent } from './dash-board/admin/users/consultar-usuarios/consultar-usuarios.component';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { NewDietComponent } from './dash-board/nutritionist/new-diet/new-diet.component';
import { NewDietTableComponent } from './dash-board/single-components/new-diet-table.component';
import { ManageAppointemntsRecordComponent } from './dash-board/nutritionist/manage-appointemnts-record/manage-appointemnts-record.component';
import { AppointmentTableComponent } from './dash-board/single-components/appointments-table.component';
import { ManagePatientsComponent } from './dash-board/nutritionist/manage-patients/manage-patients.component';
import { ConsultarPacientesComponent } from './dash-board/nutritionist/manage-patients/consultar-pacientes/consultar-pacientes.component';
import { VerDetalleComponent } from './dash-board/nutritionist/manage-patients/ver-detalle/ver-detalle.component';
import { PatientComponent } from './dash-board/patient/patient.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ScreenControllerComponent,
    NutritionistComponent,
    NavBarComponent,
    ManageAppointmentsComponent,
    NewAppointMentCompoement,
    RegisterComponent,
    UserAdminComponent,
    ConsultarUsuariosComponent,
    NewUserComponent,
    NewDietComponent,
    NewDietTableComponent,
    ManageAppointemntsRecordComponent,
    AppointmentTableComponent,
    ManagePatientsComponent,
    ConsultarPacientesComponent,
    VerDetalleComponent,
    PatientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    TabsModule.forRoot()
  ],
  providers: [CookieService, {provide: LOCALE_ID, useValue: 'es'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
