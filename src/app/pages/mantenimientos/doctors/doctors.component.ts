import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Doctor } from 'src/app/models/doctors.models';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { DoctorsService } from 'src/app/services/doctors.service';
import { ModalService } from 'src/app/services/modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: [
  ]
})
export class DoctorsComponent implements OnInit {

  doctors:Doctor[] = [];
  actualId:string;
  cargando:boolean = false;
  subsDoctor:Subscription;

  constructor(
    private _serviceDoctors:DoctorsService,
    private _modal:ModalService,
    private _busqueda:BusquedasService
  ) { }

  ngOnInit(): void {
    this.subsDoctor = this._modal.newImage.subscribe(()=>this.loadDoctors());

    this.loadDoctors();
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subsDoctor.unsubscribe();
  }
  loadDoctors(){
    this.cargando = true;
    this._serviceDoctors.loadDoctors().subscribe((res:any)=>{
      this.doctors = res.result;
      this.cargando = false;
    })
  }
  createDoctor(nombre:string, hospital:string){
    this._serviceDoctors.createDoctor(nombre, hospital).subscribe((res:any)=>{
      //this.loadDoctors();
      this.doctors.push(res);
    }, (err)=>{
      console.log(err);
    });
  }

  updateDoctor(doctor:Doctor){
    console.log(doctor);
    this._serviceDoctors.updateDoctor(doctor).subscribe((res:any)=>{
      this.loadDoctors();
      this.actualId = '';
    }, (err)=>{
      console.log(err);
    });
  }
  deleteDoctor(_id:string){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._serviceDoctors.deleteDoctor(_id).subscribe(()=>{
          this.loadDoctors();
        }, (err)=>{
          console.log(err);
        });
      }
    })
    
    
  }
  AbrirModal(doctor:Doctor){
    this._modal.AbrirModal('doctors', doctor._id, doctor.img);
  }

  editValue(_id){
    this.actualId = _id;
  }
  buscar(doctor:string){
    if(!doctor) return this.loadDoctors();

    this._busqueda.buscar('doctors', doctor).subscribe((res:any)=>{
      this.doctors = res;
    }, (err)=>{
      console.log(err);
    })
  }
}
