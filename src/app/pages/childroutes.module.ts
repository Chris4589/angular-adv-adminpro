import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { SettingsComponent } from './settings/settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthGuard } from '../guards/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';
import { UsersComponent } from './mantenimientos/users/users.component';
import { DoctorsComponent } from './mantenimientos/doctors/doctors.component';
import { HospitalsComponent } from './mantenimientos/hospitals/hospitals.component';
import { DoctorComponent } from './mantenimientos/doctors/doctor.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../guards/admin.guard';
import { RouterModule, Routes } from '@angular/router';


const childRoutes:Routes=[
  { path: '', component:DashboardComponent, data:{ title:'Dashboard'} },
  { path: 'progress', component:ProgressComponent, data:{ title:'ProgressBar'} },
  { path: 'settings', component:SettingsComponent, data:{ title:'Settings'} },
  { path: 'grafica1', component:Grafica1Component, data:{ title:'Graphics'} },
  { path: 'promises', component:PromisesComponent, data:{ title:'Promises'} },
  { path: 'rxjs', component:RxjsComponent, data:{ title:'Rxjs'} },
  { path: 'profile', component:PerfilComponent, data:{ title:'profile'} },

  { path: 'buscar/:termino', component:BusquedaComponent, data:{ title:'Busquedas'} },

  //mantenimientos
  { path: 'users', canActivate:[AdminGuard], component:UsersComponent, data:{ title:'Users'} },

  { path: 'hospitals', component:HospitalsComponent, data:{ title:'Hospitals'} },
  { path: 'doctors', component:DoctorsComponent, data:{ title:'Doctors'} },
  { path: 'doctors/:id', component:DoctorComponent, data:{ title:'Doctors'} }
]


@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forChild(childRoutes)
  ]
})
export class ChildroutesModule { }
