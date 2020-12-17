import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {
  imgUrl:User;
  constructor(private sideBar:SidebarService, private usService:UsuarioService) {
    this.imgUrl = usService.user;
   }

  menuItems:any[];

  ngOnInit(): void {
    this.menuItems = this.sideBar.menu;
  }

}
