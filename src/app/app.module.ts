import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from "ngx-cookie-service";
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

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
    NewUserComponent
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
    TimepickerModule.forRoot()
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
