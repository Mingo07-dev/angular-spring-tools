import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MqaComponent } from './mqa.component';
import { MqaRoutingModule } from './mqa-routing.module';
import { NbButtonModule, NbCardModule, NbIconModule, NbUserModule, NbFormFieldModule, NbInputModule } from '@nebular/theme';
 
 
 
@NgModule({
  declarations: [MqaComponent],
  imports: [
    MqaRoutingModule,
    CommonModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    NbUserModule,
    NbFormFieldModule,
    NbInputModule
  ]
})
export class MqaModule { }