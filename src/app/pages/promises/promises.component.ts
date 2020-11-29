import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: [
  ]
})
export class PromisesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    const promises = new Promise( (resolve, reject) =>{

      if(false)
        resolve('object aa');
      else
      reject('error');

    });
    promises.then(data=>{
      console.log(data);
    }).catch( error=>{
      console.log(error);
    })
    console.log('fin');

    this.getUsers().then( users => console.log(users));
  }

  getUsers(){

    return new Promise( (resolve) =>{
      fetch('https://reqres.in/api/users?page=2').then(response =>
        response.json()
      ).then(body=> resolve(body.data));
    });
  }
}
