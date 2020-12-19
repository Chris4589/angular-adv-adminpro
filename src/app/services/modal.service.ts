import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private _ocultarModal:boolean = true;
  public _img = '';
  public _type: 'users' | 'doctors' | 'hospitals';
  public _id:string;

  public newImage: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  get getModal(){
    return this._ocultarModal;
  }

  cerrarModal()
  {
    this._ocultarModal = true;
  }
  AbrirModal(
    type: 'users' | 'doctors' | 'hospitals',
    id:string,
    img:string ='x'
  )
  {
    this._ocultarModal = false;
    this._id = id;
    this._type = type;

    
    if( img.includes('http') )
      this._img = img;
    else  
      this._img = `${base_url}/upload/?collection=${type}&file=${img}`;
  }
    
}
