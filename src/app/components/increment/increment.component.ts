import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-increment',
  templateUrl: './increment.component.html',
  styles: [
  ]
})
export class IncrementComponent implements OnInit {
  
  @Input() progress:number = 10;
  @Input() btnClass:string = "btn-primary";

  @Output() valueChanges: EventEmitter<number> = new EventEmitter();

  ngOnInit() {
    this.btnClass = `btn ${this.btnClass}`;
  }

  changeValues(value:number){
    if(this.progress >= 100 && value > 0)
      this.progress = 100;
    else if(this.progress <= 0 && value < 0)
      this.progress = 0;
    else
      this.progress += value;
      
      this.valueChanges.emit(this.progress);
  }

  changeValues2(value:number){
    if(value >= 100)
      value = 100;
    else if( value <= 0)
      value = 0;
     
    this.valueChanges.emit(value);
  }
}
