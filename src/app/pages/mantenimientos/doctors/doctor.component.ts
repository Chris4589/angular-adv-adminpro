import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { Doctor } from 'src/app/models/doctors.models';
import { Hospital } from 'src/app/models/hospitals.models';
import { DoctorsService } from 'src/app/services/doctors.service';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalService } from 'src/app/services/modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: [
  ]
})
export class DoctorComponent implements OnInit {

  medicoForm:FormGroup;
  hospitalesOptions:Hospital[];
  hospitalSelected:Hospital;
  medicoSelected:Doctor;

  constructor(
    private fb:FormBuilder,
    private _serviceDoctors:DoctorsService,
    private _serviceHospital:HospitalService,
    private _router:Router,
    private ActivatedRoute:ActivatedRoute,
    private _modal:ModalService
  ) { }

  ngOnInit(): void {
    
    this.ActivatedRoute.params.subscribe(({ id })=>{

      if(id && id !== 'nuevo'){
        this._serviceDoctors.getDoctor(id).subscribe((res:any)=>{
          
          const { nombre, hospital:{ _id } } = res.result;
          this.medicoSelected = res.result;
          this.medicoForm.setValue({
            nombre,
            hospital:_id
          });
        }, err=>{
          this._router.navigateByUrl('/dashboard/doctors');
        });
      }
    });

    this.medicoForm = this.fb.group({
      nombre:['Hern', Validators.compose([
        Validators.required,
        Validators.min(3)
      ])],
      hospital:['', Validators.compose([
        Validators.required,
        Validators.min(1)
      ])]
    });
    this.loadHospital();

    this.medicoForm.get('hospital').valueChanges.pipe(delay(1000)).subscribe((hospId)=>{
      this.hospitalSelected = this.hospitalesOptions.find( h => h._id === hospId );
      console.log('tick');
    });
    
    this._modal.newImage.subscribe((res:string)=>{
      this.medicoSelected.img = res;
    });
  }
  saveDoctor(){

    if(this.medicoSelected){
      const data = {
        ...this.medicoForm.value,
        _id:this.medicoSelected._id
      }
      this._serviceDoctors.updateDoctor(data).subscribe((res:any)=>{
        Swal.fire('Actualizaco', 'se actualizo correctamente', 'success');
      }, (err)=>{
        Swal.fire('no actualizo', 'No se actualizo', 'error');
      });
      return;
    }

    const { nombre, hospital } = this.medicoForm.value;
    this._serviceDoctors.createDoctor(nombre, hospital).subscribe((res:any)=>{
      Swal.fire('Creado', 'se creo correctamente', 'success');

      this._router.navigateByUrl(`/dashboard/doctors/${res.result._id}`)
    }, (err)=>{
      Swal.fire('no Creado', 'No se creo', 'error');
    });
  }

  loadHospital(){
    this._serviceHospital.getHospitals().subscribe((hospitales)=>{
      this.hospitalesOptions = hospitales.result.data;
    })
  }
  AbrirModal(doctor:Doctor){
    this._modal.AbrirModal('doctors', doctor._id, doctor.img);
  }
}
