import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from "ngx-cookie-service";
import { ModalModule } from 'ngx-bootstrap/modal';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { ScreenControllerComponent } from './dash-board/screen-controller/screen-controller.component';
import { ManagePatientsComponent } from './dash-board/nutritionist/manage-patients/manage-patients.component';
import { NutritionistComponent } from './dash-board/nutritionist/nutritionist.component';
import { NavBarComponent } from './dash-board/nav-bar/nav-bar.component';
import { ManageAppointmentsComponent,  } from './dash-board/nutritionist/manage-appointments/manage-appointments.component';
import { DecimalPipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewAppointMentCompoement } from './dash-board/single-components/new-appointment.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ScreenControllerComponent,
    NutritionistComponent,
    ManagePatientsComponent,
    NavBarComponent,
    ManageAppointmentsComponent,
    NewAppointMentCompoement
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
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
