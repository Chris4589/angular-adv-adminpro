import { Component, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnInit {

  title:string;
  titleSub:Subscription;

  constructor(private router:Router) { 
    this.titleSub = this.getTitle().subscribe(({title})=>{
      //obtenemos lo enviado y lo seteamos
      this.title = title;
      document.title = `Admin pro - ${title}`;
    });
  }

  ngOnInit(): void {
    
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.titleSub.unsubscribe();
  }
  //dar titulo desde router
  getTitle(){
    return this.router.events.pipe(
      //verifica si es de ese tipo y la filtra
      filter(dat => dat instanceof ActivationEnd),
      //de lo antes filtrado filtra el que first chield esta vacio
      filter( (evento:ActivationEnd) => evento.snapshot.firstChild === null ),
      //envia solo solo snapshot.data
      map( (evento:ActivationEnd) => evento.snapshot.data )
    );
  }
}
