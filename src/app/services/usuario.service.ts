import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Login } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';

import { catchError, map, retry, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

const base_url = environment.base_url;
declare const gapi;
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  auth2:any;
  user:User;

  constructor(
    private http:HttpClient, 
    private router:Router,
    private ngZone:NgZone
    ) {
    this.googleInit();
   }

   get getToken():string{
    return localStorage.getItem('token') || '';
   }
   get getId():string{
    return this.user._id || '';
   }
  googleInit(){
    return new Promise((resolve)=>{
      gapi.load('auth2', ()=>{
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        
        this.auth2 = gapi.auth2.init({
          client_id: '323474616110-skletftrtlg9qt662222t39tn87e04h6.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          // Request scopes in addition to 'profile' and 'email'
          //scope: 'additional_scope'
        });
        
        resolve(this.auth2);
      });
    });
  }
  logOut(){
    localStorage.removeItem('token');
    
    this.auth2.signOut().then( ()=> {
      this.ngZone.run(()=>{
        this.router.navigateByUrl('/login');
      });
    });
  }

  validarToken():Observable<boolean>{

    return this.http.get(`${base_url}/login/renew/`,{
      headers:{
        token: this.getToken
      }
    }).pipe(
      map((response:any)=>{
        const { token, data } = response.result;
        const { role, google, _id, nombre, email, img } = data;
        localStorage.setItem('token', token);

        this.user = new User(role, nombre, email, _id, google, img, '');
        return true;
      }),
      catchError(err=> of(false))

    );
  }

  createUsers(formData:RegisterForm){

    const { password2, terminos, ...data } = formData;//destructuring porque la validacion de 
    //express-joi-validation no acepta otros campos que no registre
    return this.http.post(`${base_url}/users/`, data).pipe(
      tap((response:any)=>{
        localStorage.setItem('token', response.result);
      })
    );
  }

  updateUsers(data:{nombre:string, email:string}){
    return this.http.put(`${base_url}/users/?_id=${this.getId}`, data,
    {
      headers:{
        token: this.getToken
      }
    })/*.pipe(
      map((res:any)=>{
        this.user.nombre = res.result.nombre;
        this.user.email = res.result.email;
      })
    )*/;
  }
 
  userLogin(formData:Login){
    const { remember, ...data } = formData;
    return this.http.post(`${base_url}/login/`, data).pipe(
      tap((response:any)=>{
        localStorage.setItem('token', response.result);
      })
    );
  }
  googleSign(token:string){
    return this.http.post(`${base_url}/login/google/`, {token}).pipe(
      tap((response:any)=>{
        localStorage.setItem('token', response.result);
      })
    );
  }
}
