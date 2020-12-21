import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Doctor } from '../models/doctors.models';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {

  constructor(
    private http:HttpClient
  ) { 

  }

  get getToken(){
    return localStorage.getItem('token');
  }
  get getHeaders(){
    return {
      headers:{
        token: this.getToken
      }
   }
 }

  loadDoctors(){
    return this.http.get(`${base_url}/doctors/`, this.getHeaders);
  }
  getDoctor(_id){
    return this.http.get(`${base_url}/doctors/?_id=${_id}`, this.getHeaders);
  }
  createDoctor(nombre:string, hospital:string){
    return this.http.post(`${base_url}/doctors/`, {nombre, hospital}, this.getHeaders);
  }

  updateDoctor(doctor:Doctor){console.log(doctor);
    const { _id, ...data } = doctor;
    console.log(data);
    return this.http.put(`${base_url}/doctors/?_id=${_id}`, data, this.getHeaders);
  }
  deleteDoctor(_id){
    return this.http.delete(`${base_url}/doctors/?_id=${_id}`, this.getHeaders);
  }
}
