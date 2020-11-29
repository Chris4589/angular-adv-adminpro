import { Component, OnInit } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit {

  private intervalSubs:Subscription;
  constructor() { 
    /*this.obs().pipe(
      retry()
    ).subscribe(
      data=> console.log(data),
      err=> console.error(err),
      ()=> console.log('complete')
    )*/
    
    this.intervalSubs = this.returnInterval().subscribe(console.log);

  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.intervalSubs.unsubscribe();
  }

  returnInterval():Observable<number>
  {
    return interval(1000).pipe(
      //take(10), 
      map(value =>{
        return value + 1;
      }),
      filter(value=> value%2 === 0)
    );
  }

  obs():Observable<number>{
    let i = 0;

    return new Observable( observer=>{
      
      const intervalo = setInterval(()=>{
        ++i;
        observer.next(i);

        if(i ===4){
          clearInterval(intervalo);
          observer.complete();
        }
        if(i ===2){
          observer.error('es 2');
        }
      }, 1000);
    });
  }

}
