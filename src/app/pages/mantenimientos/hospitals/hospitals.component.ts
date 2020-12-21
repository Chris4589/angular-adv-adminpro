import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Hospital } from 'src/app/models/hospitals.models';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalService } from 'src/app/services/modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: [
  ]
})
export class HospitalsComponent implements OnInit {

  Hospitals:Hospital[] =[];
  totalHospitals:number;
  hospitalSubscription:Subscription;
  cargando:boolean = true;
  idActive:string;

  constructor(
    private _usuarioHospital:HospitalService,
    private modal:ModalService,
    private _busqueda:BusquedasService
  ) { }

  ngOnInit(): void {
    this.loadHospitals();

    this.hospitalSubscription = this.modal.newImage.subscribe(()=>this.loadHospitals());
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.hospitalSubscription.unsubscribe();
  }
  loadHospitals(){
    
    this.cargando = true;
    this._usuarioHospital.getHospitals().subscribe((res)=>{
      
      this.Hospitals = res.result.data;
      this.totalHospitals = res.result.total;
      this.cargando = false;
    });
  }
  clickActive(_id){
    this.idActive = _id;
  }
  async createHospital(){
    const { value } = await Swal.fire<string>({
      title:'Crear Hospital',
      input: 'text',
      inputLabel: 'Nombre:',
      showCancelButton: true,
      inputPlaceholder: 'Nombre del hospital'
    })
    
    if (value) {
      console.log(value);
      this._usuarioHospital.createHospital(value).subscribe((res)=>{
        Swal.fire(
          'Creado',
          'Haz creado el hospital correctamente!',
          'success'
        );
        this.Hospitals.push(res.result);
      }, (err)=>{
        Swal.fire(
          'error',
          'No haz creado el usuario!',
          'error'
        );
      });
    }
  }
  editHospital(hospital:Hospital){
    this._usuarioHospital.updateHospital(hospital).subscribe((res)=>{
      this.loadHospitals();
      this.idActive = "";
      Swal.fire(
        'Editado',
        'Haz editado el hospital correctamente!',
        'success'
      );
    }, (err)=>{
      Swal.fire(
        'error',
        'No haz editado el usuario!',
        'error'
      );
    });
  }
  deleteHospital(_id:number){
    this._usuarioHospital.deleteHospital(_id).subscribe((res)=>{
      this.loadHospitals();
      this.idActive = "";
      Swal.fire(
        'Borrado',
        'Haz eliminado el hospital correctamente!',
        'success'
      );
    }, (err)=>{
      Swal.fire(
        'error',
        'No haz eliminado el hospital!',
        'error'
      );
    });
  }

  abrirModal(hosptal:Hospital){
    this.modal.AbrirModal('hospitals', hosptal._id, hosptal.img );
  }
  buscarHospitales(hospital:string){
    if(!hospital) return this.loadHospitals();

    this._busqueda.buscar('hospitals', hospital).subscribe((res)=>{
      this.Hospitals = res;
      this.cargando = false;
    })
  }
}
