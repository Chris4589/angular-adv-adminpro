import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2'

declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css'
  ]
})
export class LoginComponent implements OnInit {

  registerForm:FormGroup;
  public auth2:any;
  public formSumbmitted:boolean = false;
  constructor(
    private router:Router,
    private usService:UsuarioService,
    private fb:FormBuilder,
    private ngZone:NgZone
    ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: [localStorage.getItem('email') || '', Validators.compose([
        Validators.required,
        Validators.min(3),
        Validators.email
      ])],
      password:['', Validators.compose([
        Validators.required,
        Validators.min(3)
      ])],
      remember:[localStorage.getItem('remember') || false, Validators.required]
    });

    this.renderButton();
  }

  login(){
    this.formSumbmitted = true;

    if(this.registerForm.invalid)
      return;

    if(this.registerForm.get('remember').value){
      localStorage.setItem('email', this.registerForm.get('email').value);
      localStorage.setItem('remember', this.registerForm.get('remember').value);
    }else{
      localStorage.removeItem('email');
      localStorage.removeItem('remember');
    }
    
    const log = this.usService.userLogin(this.registerForm.value).subscribe(data=>{
      this.router.navigateByUrl('/');
      log.unsubscribe();
    }, (err)=>{
      Swal.fire('Error', err.error.result, 'error');
      log.unsubscribe();
    });
    
  }

  campoNoValid(campo:string):boolean{

    if(this.registerForm.get(campo).invalid && !this.registerForm.controls[campo].dirty && this.formSumbmitted)
      return true;

    return false;
  }

  /*onSuccess(googleUser) {
    console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
    var id_token = googleUser.getAuthResponse().id_token;
    console.log(id_token);
    const signgoogle = this.usService.googleSign(id_token)
  }
  onFailure(error) {
    console.log(error);
  }*/
  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark'
    });
    this.startApp();
  }
  async startApp() {
    
    this.auth2 = await this.usService.googleInit();
    
    //this.auth2 = this.usService.auth2;
    this.attachSignin(document.getElementById('my-signin2'));
  };

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
        (googleUser)=> {
          
            var id_token = googleUser.getAuthResponse().id_token;
            
            const log = this.usService.googleSign(id_token).subscribe((data)=>{
              this.ngZone.run(()=>{
                this.router.navigateByUrl('/');
              });

              log.unsubscribe();
            }, (err)=>{
              Swal.fire('Error', err.error.result, 'error');
              log.unsubscribe();
            });
        }, function(error) {
          alert(JSON.stringify(error, undefined, 2));
          Swal.fire('Error', JSON.stringify(error, undefined, 2), 'error');
        });
  }
}
