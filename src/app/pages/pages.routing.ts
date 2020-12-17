import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { SettingsComponent } from './settings/settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthGuard } from '../guards/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';



const routes: Routes = [
    { 
    path: 'dashboard', 
    component:PagesComponent,
    canActivate:[AuthGuard],
    children:[
        { path: '', component:DashboardComponent, data:{ title:'Dashboard'} },
        { path: 'progress', component:ProgressComponent, data:{ title:'ProgressBar'} },
        { path: 'settings', component:SettingsComponent, data:{ title:'Settings'} },
        { path: 'grafica1', component:Grafica1Component, data:{ title:'Graphics'} },
        { path: 'promises', component:PromisesComponent, data:{ title:'Promises'} },
        { path: 'rxjs', component:RxjsComponent, data:{ title:'Rxjs'} },
        { path: 'profile', component:PerfilComponent, data:{ title:'profile'} }
    ]
    },
    //{ path: 'path/:routeParam', component: MyComponent },
    //{ path: 'staticPath', component: ... },
    //{ path: '**', component: ... },
    //{ path: 'oldPath', redirectTo: '/staticPath' },
    //{ path: ..., component: ..., data: { message: 'Custom' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
