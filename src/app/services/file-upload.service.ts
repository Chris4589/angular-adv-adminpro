import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})

export class FileUploadService {

  constructor(
    private http:HttpClient
    ) { }

  updatePhoto(
    archivo:File,
    type: 'users' | 'doctors' | 'hospitals',
    id:string
  ){
      const url = `${base_url}/upload/?collection=${type}&_id=${id}`;
  
      const formData = new FormData();
      formData.append('img', archivo);

      return this.http.put(url, formData, {
        headers:{
          token:localStorage.getItem('token')
        }
      });
    
  }
}
