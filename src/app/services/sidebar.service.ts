import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  public menu = [];

  cargarMenu(){
    this.menu = JSON.parse(localStorage.getItem('menu')) || [];

    
  }
/*
  public menu:any[] =[
    {
      title: 'Dashboard!!',
      icon: 'mdi mdi-gauge',
      submenu:[
        { title: 'Main', url: '/' },
        { title: 'ProgressBar', url: 'progress' },
        { title: 'Grafica', url: 'grafica1' },
        { title: 'Promises', url: 'promises'},
        { title: 'Rxjs', url: 'rxjs'}
      ]
    },
    {
      title: 'Mantenimientos!!',
      icon: 'mdi mdi-folder-lock-open',
      submenu:[
        { title: 'Users', url: 'users' },
        { title: 'Hospitals', url: 'hospitals' },
        { title: 'Doctors', url: 'doctors' }
      ]
    }
  ]*/
  constructor() { }
}
