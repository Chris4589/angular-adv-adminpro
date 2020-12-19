import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementComponent } from './increment/increment.component';
import { FormsModule } from '@angular/forms';
import { DonaComponent } from './dona/dona.component';

import { ChartsModule } from 'ng2-charts';
import { ModalComponent } from './modal/modal.component';
@NgModule({
  declarations: [
    IncrementComponent,
    DonaComponent,
    ModalComponent
  ],
  exports:[
    IncrementComponent,
    DonaComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule
  ]
})
export class ComponentsModule { }
