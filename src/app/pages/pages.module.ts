import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../components/components.module';
import { SettingsComponent } from './settings/settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './mantenimientos/users/users.component';
import { DoctorsComponent } from './mantenimientos/doctors/doctors.component';
import { HospitalsComponent } from './mantenimientos/hospitals/hospitals.component';
import { PipesModule } from '../pipes/pipes.module';
import { DoctorComponent } from './mantenimientos/doctors/doctor.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    SettingsComponent,
    PromisesComponent,
    RxjsComponent,
    PerfilComponent,
    UsersComponent,
    DoctorsComponent,
    HospitalsComponent,
    DoctorComponent
  ],
  exports:
  [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    SettingsComponent,
    PromisesComponent,
    RxjsComponent,
    PerfilComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ComponentsModule,
    ReactiveFormsModule,
    FormsModule,
    
    RouterModule,
    PipesModule
  ]
})
export class PagesModule { }
