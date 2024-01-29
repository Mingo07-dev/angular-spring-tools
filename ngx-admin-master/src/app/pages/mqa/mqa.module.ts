import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MqaComponent } from './mqa.component';
import { MqaRoutingModule } from './mqa-routing.module';
import { NbButtonModule, NbCardModule, NbIconModule, NbUserModule, NbFormFieldModule, NbInputModule, NbTreeGridModule, NbAccordionModule } from '@nebular/theme';
import { NgxEchartsModule } from 'ngx-echarts';
import { FsIconComponent } from './mqa.component';
import { TablesRoutingModule } from '../tables/tables-routing.module';
import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

 
 
 
@NgModule({
  declarations: [MqaComponent,FsIconComponent,],
  imports: [
    MqaRoutingModule,
    CommonModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    NbUserModule,
    NbFormFieldModule,
    NbInputModule,
    NbAccordionModule,
    NgxEchartsModule,
    NbTreeGridModule,
    TablesRoutingModule,
    ThemeModule,
    Ng2SmartTableModule
  ]
})
export class MqaModule { }