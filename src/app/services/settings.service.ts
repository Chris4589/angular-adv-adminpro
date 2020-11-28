import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private doc = document.querySelector('#theme');
  private link = document.querySelector('#theme');
  constructor() {
    const url = localStorage.getItem('theme') || `./assets/css/colors/default-dark.css`;
  
    this.doc.setAttribute('href', url);
   }

   changeTheme(color:string){
    const url = `./assets/css/colors/${color}.css`;

    this.doc.setAttribute('href', url);

    localStorage.setItem('theme', url);
  }

  checkTheme(links){
    console.log(links);
    links.forEach(element => {;
      element.classList.remove('working');

      const btnTheme = element.getAttribute('data-theme');
      const btnUrl = `./assets/css/colors/${btnTheme}.css`;

      const currentTheme = this.link.getAttribute('href');
      
      if(btnUrl === currentTheme)
        element.classList.add('working');

        console.log('object');
    });
  }
}
