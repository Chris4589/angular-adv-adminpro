import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  urlImg:User;
  constructor(
    private usService:UsuarioService,
    private _router:Router
  ) {
    this.urlImg = usService.user;
   }

  ngOnInit(): void {
  }
  user_Logout(){
    this.usService.logOut();
  }
  buscar(dato:string){
    if(!dato)
      return;

    this._router.navigateByUrl(`/dashboard/buscar/${dato}`);
  }
}
