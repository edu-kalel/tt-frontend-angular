import { Component } from '@angular/core';
import { NutritionistService } from 'src/app/Services/nutritionist.service';

@Component({
  selector: 'app-manage-patients',
  templateUrl: './manage-patients.component.html',
  styleUrls: ['./manage-patients.component.css']
})
export class ManagePatientsComponent {

  constructor(
    private nutriService: NutritionistService
  ) { }

  ngOnInit() {
    this.getPatients()
  }

  getPatients() {
    this.nutriService.getPatients().pipe().
      subscribe((data: any) => {
        console.log(data)
      })
  }
}
