import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ScreenControllerComponent } from './dash-board/screen-controller/screen-controller.component';
import { NutritionistComponent } from './dash-board/nutritionist/nutritionist';
import { ManagePatientsComponent } from './dash-board/nutritionist/manage-patients/manage-patients.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'dash-board', component: ScreenControllerComponent, children: [
      {
        path: 'nutritionist', component: NutritionistComponent, children: [
          { path: '', component: ManagePatientsComponent }
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
