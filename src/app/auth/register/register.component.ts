import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';


import Swal from 'sweetalert2'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [
    './register.component.css'
  ]
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup;

  public formSumbmitted = false;

  constructor(
      private fb:FormBuilder,
      private usService:UsuarioService,
      private router:Router
    ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.compose([
          Validators.required,
          Validators.min(5)
        ])
      ],
      email: ['', Validators.compose([
        Validators.min(20),
        Validators.required,
        Validators.email
      ])
    ],
      password: ['', Validators.compose([
          Validators.required,
          Validators.min(5)
        ])
      ],
      password2: ['', Validators.compose([
          Validators.required,
          Validators.min(5)
        ])
      ],
      terminos: [false, [Validators.required]]
    },{
      validators: this.passwordsIguales('password', 'password2')
    });
  }

  createUser(){

    this.formSumbmitted = true;

    if(this.registerForm.invalid)
      return;
      
    const register = this.usService.createUsers(this.registerForm.value).subscribe(data=>{
      console.log(`usuario creado ${data}`);
      this.router.navigateByUrl('/');
      register.unsubscribe();
    }, err=>{
      Swal.fire('Error', err.error.result, 'error');
      register.unsubscribe();
    });
  }

  campoNoValid(campo:string):boolean{

    if(this.registerForm.get(campo).invalid && !this.registerForm.controls[campo].dirty && this.formSumbmitted)
      return true;

    return false;
  }
  contrasenasInvalid():boolean{
    const pass = this.registerForm.controls['password'].value;
    const pass2 = this.registerForm.controls['password2'].value;

    return (pass !== pass2) && this.formSumbmitted;
  }
  passwordsIguales(pass:string, pass2:string){
    return (fg:FormGroup)=>{
      const pw1 = fg.controls[pass];
      const pw2 = fg.controls[pass2];

      if(pw1.value == pw2.value){
        pw2.setErrors(null);
      }
      else
      {
        pw2.setErrors({noEsIgual:true});
      }
    }
  }
}
