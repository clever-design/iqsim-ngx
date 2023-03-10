import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { SharedModule } from '../../shared/shared.module';
import { IqModulationRoutingModule } from './iq-modulation-routing.module';
import { IqModulationComponent } from './iq-modulation/iq-modulation.component';
import { IqModulationBasicComponent } from './iq-modulation/basic/iq-modulation-basic.component';
import { IqModulationOverviewComponent } from './iq-modulation/overview/iq-modulation-overview.component';

@NgModule({
  declarations: [
    IqModulationComponent,
    IqModulationBasicComponent,
    IqModulationOverviewComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgxEchartsModule,
    IqModulationRoutingModule,
  ],
})
export class IqModulationModule {}
