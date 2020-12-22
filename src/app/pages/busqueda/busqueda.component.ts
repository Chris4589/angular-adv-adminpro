import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Doctor } from 'src/app/models/doctors.models';
import { Hospital } from 'src/app/models/hospitals.models';
import { User } from 'src/app/models/user.model';
import { BusquedasService } from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  hospitals:Hospital[];
  doctors:Doctor[];
  users:User[];
  constructor(
    private _activatedRoute:ActivatedRoute,
    private _search:BusquedasService
  ) { }

  ngOnInit(): void {
    console.log(this.users);
    this._activatedRoute.params.subscribe(({termino})=>{
      this._search.searchesAll(termino).subscribe(({ users, doctors, hospitals })=>{
        this.users = users;
        this.hospitals = hospitals;
        this.doctors = doctors;
      });
    });
  }

  abrirMedico(medico:Doctor){
    console.log(medico);
  }
}
