import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

const url_base = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor(
    private http:HttpClient
  ) { }

  get getToken():string{
    return localStorage.getItem('token') || '';
   }
   get getHeaders(){
     return {
       headers:{
         token: this.getToken
       }
     }
   }

   buscar(
     type:'users'|'hospitals'|'doctors',
     text:string
   ){
     return this.http.get(`${url_base}/collection/?searches=${text}&table=${type}`, this.getHeaders).pipe(
       map((res:any) => { 
        let data;
        switch (type) {
          case 'users':
            return res.result.map(
              (info:any) => {
                  return new User(info.role, info.nombre, info.email, info._id, info.google, info.img, '');
              });

            case 'hospitals':
              return res.result;

            case 'doctors':
              return res.result;
        }
        })
     );
   }

   searchesAll(fact){
     return this.http.get(`${url_base}/todo/?search=${fact}`, this.getHeaders).pipe(
       map(({ result:{ users, doctors, hospitals } }:any )=>{
        return { users, doctors, hospitals };
       })
     );
   }
}
