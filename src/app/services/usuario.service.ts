import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Login } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';

import { catchError, delay, map, retry, tap } from 'rxjs/operators';
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
   get getHeaders(){
     return {
       headers:{
         token: this.getToken
       }
     }
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

    return this.http.get(`${base_url}/login/renew/`, this.getHeaders).pipe(
      map((response:any)=>{
        const { token, data } = response.result;
        const { role, google, _id, nombre, email, img } = data;
        localStorage.setItem('token', token);

        this.user = new User(role, nombre, email, _id, google, img, '');
        //se puede enviar info this.user = data; y usar una pipe para la img
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
    });
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

  loadUsers(desde:number = 0){
    return this.http.get(`${base_url}/users/?start=${desde}`, this.getHeaders).pipe(
      delay(200),
      map((res:any)=>{
        const { data, total } = res.result;
        
        const users = data.map(
          (info:any) => new User(info.role, info.nombre, info.email, info._id, info.google, info.img, '')
        );
        return { data:users, total };
      })
    );
  }
  deleteUserById(_id){
    return this.http.delete(`${base_url}/users/?_id=${_id}`, this.getHeaders);
  }
  updateOneUser(data:User){
    const { google, _id, password, img, ...usuario } = data;

    return this.http.put(`${base_url}/users/?_id=${_id}`, usuario, this.getHeaders);
  }
}
