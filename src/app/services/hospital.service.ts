import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospitals.models';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  start:number = 0;

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

  getHospitals(){
    return this.http.get<{error:boolean, result:{ data:Hospital[], total:number }}>(`${base_url}/hospitals/?start=${this.start}`, this.getHeaders);
  }
  createHospital(nombre:string){
    return this.http.post<{error:boolean, result:Hospital}>(`${base_url}/hospitals/`, {nombre}, this.getHeaders);
  }
  updateHospital(body:Hospital){
    const { _id, user, img, ...data } = body;
    return this.http.put(`${base_url}/hospitals/?_id=${_id}`, data, this.getHeaders);
  }
  deleteHospital(_id:number){
    return this.http.delete(`${base_url}/hospitals/?_id=${_id}`, this.getHeaders);
  }
}
