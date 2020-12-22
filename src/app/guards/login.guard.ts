import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private router:Router,
    private _usuarioService:UsuarioService
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean{

      let token = localStorage.getItem('token');
      console.log(this._usuarioService.logged);
      console.log(this._usuarioService.user);
      if(!this._usuarioService.logged)
        return true;

      this.router.navigateByUrl('/dashboard');
      return false;
    
  }
  
}