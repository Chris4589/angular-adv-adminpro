import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalService } from 'src/app/services/modal.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

import swal from 'sweetalert2';

const base_url = environment.base_url;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent implements OnInit {

  users:User[] = [];
  totalUsers:number = 0;
  desde:number = 0;
  cargando:boolean = true;
  private imgSub:Subscription;
  constructor(
    private usService:UsuarioService, 
    private showService:BusquedasService, 
    private modal:ModalService) { }

  ngOnInit(): void {
    this.cargarUsers();

    this.imgSub = this.modal.newImage.pipe(
      delay(200)
      ).subscribe((res)=>{
        console.log(res);
        this.cargarUsers();
      });
  }
  ngOnDestroy(): void {
    this.imgSub.unsubscribe(); 
  }
  cambiarPagina(value){

    this.desde += value;

    if(this.desde < 0)
      this.desde = 0;
    else if(this.desde > this.totalUsers)
      this.desde -= value;
    this.cargarUsers();
  }

  cargarUsers(){
    this.cargando = true;
    this.usService.loadUsers(this.desde).subscribe((res:any)=>{
      
      const { data, total } = res;
      this.users = data;
      this.totalUsers = total;
      this.cargando = false;
    }, (err)=>{
      console.log(err);
      swal.fire('Error', err.result, 'error');
    });
  }
  BuscarInfo(buscar:string){
    if(!buscar)
    return this.cargarUsers();

    this.showService.buscar('users', buscar).subscribe((res:any)=>{
      this.users = res;
    });
  }
  deleteUser(_id){
    if(this.usService.getId === _id)
      return Swal.fire(
        'Error!',
        'No puedes eliminarte a ti mismo',
        'error'
      );
    
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
        this.usService.deleteUserById(_id).subscribe(()=>{
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          this.cargarUsers();
        });
      }
    })
  }
  changeRole(usuario:User){

      this.usService.updateOneUser(usuario).subscribe(()=>{
        Swal.fire(
          'Actualizado',
          'haz actualizado estos datos',
          'success'
        )
        this.cargarUsers();
      }, (err)=>{
        console.log(err);
        Swal.fire(
          'NO Actualizado',
          'no se ha actualizado estos datos',
          'error'
        )
      });
  }

  abrirModal(usuario:User){
    this.modal.AbrirModal('users', usuario._id, usuario.img );
  }

}
