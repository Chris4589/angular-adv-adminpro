import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';

import Swal from 'sweetalert2'
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  changeForm:FormGroup;
  user:User;
  imagenSubir:File;
  imgTemp:any = '';

  constructor(private fb:FormBuilder, private usService:UsuarioService, private fileUpdate:FileUploadService) {
    this.user = usService.user;
  }

  ngOnInit(): void {
    this.changeForm = this.fb.group({
      nombre:[this.user.nombre, Validators.compose([
        Validators.required,
        Validators.min(3)
      ])],
      email:[this.user.email, Validators.compose([
        Validators.required,
        Validators.email,
        Validators.min(7)
      ])]
    });
  }
  updateImg(){
    if(!this.imagenSubir) 
      return;
    this.fileUpdate.updatePhoto(this.imagenSubir, 'users', this.user._id).subscribe((res:any)=>{
      this.user.img = res.result.FileName;
      Swal.fire('Correct!', "Perfil Actualizado", 'success');
    }, (err)=>{
      console.log(err);
      Swal.fire('Error', err.error.result, 'error');
    });
    
  }
  changeImg(event){
    const [ newFile ] = event.target.files;
    this.imagenSubir = newFile;

    if(!newFile)
      return this.imgTemp = null;

    const rider = new FileReader();
    rider.readAsDataURL(newFile);

    rider.onloadend = () =>{
      this.imgTemp = rider.result;//imgbase64
    }
  }
  updateProfile(){
    this.usService.updateUsers(this.changeForm.value).subscribe(()=>{
      const { nombre, email } = this.changeForm.value;
      this.user.email = email;
      this.user.nombre = nombre;
      Swal.fire('Correct!', "Imagen cambiada", 'success');
    },
    (err)=>{
      Swal.fire('Error', err.error.result, 'error');
    });
  }
}
