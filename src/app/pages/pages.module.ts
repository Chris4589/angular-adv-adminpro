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


@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    SettingsComponent
  ],
  exports:
  [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ComponentsModule,
    
    RouterModule
  ]
})
export class PagesModule { }
