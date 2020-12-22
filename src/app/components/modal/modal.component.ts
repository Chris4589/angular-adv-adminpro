import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalService } from 'src/app/services/modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styles: [
  ]
})
export class ModalComponent implements OnInit {

  
  imagenSubir:File;
  imgTemp:any = '';

  constructor(
    public modal:ModalService,
    private fileUpdate:FileUploadService
  ) { }

  ngOnInit(): void {
  }

  cerrarModal(){
    this.modal.cerrarModal();
    this.imgTemp = null;
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
  updateImg(){
    if(!this.imagenSubir) 
      return;

    const { _id, _type } = this.modal;

    this.fileUpdate.updatePhoto(this.imagenSubir, _type, _id).subscribe((res:any)=>{
      
      Swal.fire('Correct!', "Perfil Actualizado", 'success');
      this.modal.newImage.emit(res.result.FileName);
      this.modal.cerrarModal();
    }, (err)=>{
      console.log(err);
      Swal.fire('Error', err.error.result, 'error');
    });
  }
}
