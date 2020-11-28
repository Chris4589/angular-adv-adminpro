import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styles: [
  ]
})
export class SettingsComponent implements OnInit {

  private linkTheme:NodeListOf<Element>;
  

  constructor(private ss: SettingsService) { }

  ngOnInit(): void {
    this.linkTheme = document.querySelectorAll('.selector');
    this.ss.checkTheme(this.linkTheme);
  }

  changeTheme(color:string){
    this.ss.changeTheme(color);
    this.ss.checkTheme(this.linkTheme);
  }
  
}
