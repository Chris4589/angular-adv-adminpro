import { Component } from '@angular/core';



@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

  doughnutChartLabels: string[] = ['apartado 1', 'apartado 2', 'apartado 3'];
  doughnutChartData= [
    [124, 56, 567]
  ];
}
