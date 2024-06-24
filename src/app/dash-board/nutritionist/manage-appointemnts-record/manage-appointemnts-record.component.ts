import { Component } from '@angular/core';
import { AppointmentBasicInfo } from 'src/app/models';
import { NutritionistService } from 'src/app/Services/nutritionist.service';

@Component({
  selector: 'app-manage-appointemnts-record',
  templateUrl: './manage-appointemnts-record.component.html',
  styleUrls: ['./manage-appointemnts-record.component.css']
})
export class ManageAppointemntsRecordComponent {
  appointmentsConfirmed: AppointmentBasicInfo[] = []
  appointmentsSolicited: AppointmentBasicInfo[] = []


  constructor(
    private nutriService: NutritionistService
  ){}

  ngOnInit() {
    this.getAppointmentsConfirmed()
    this.getAppointmentsSolicitued()
  }

  getAppointmentsConfirmed() {
    this.nutriService.getAppointmentsConfirmed().pipe()
      .subscribe((data: AppointmentBasicInfo[]) => {
        this.appointmentsConfirmed = data
      })
  }

  getAppointmentsSolicitued() {
    this.nutriService.getAppointmentsSolicited().pipe()
    .subscribe((data: AppointmentBasicInfo[]) => {
      this.appointmentsSolicited = data
    })
  }
}
