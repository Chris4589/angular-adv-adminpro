import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu:any[] =[
    {
      title: 'Dashboard!!',
      icon: 'mdi mdi-gauge',
      submenu:[
        { title: 'Main', url: '/' },
        { title: 'ProgressBar', url: 'progress' },
        { title: 'Grafica', url: 'grafica1' }
      ]
    }
  ]
  constructor() { }
}
