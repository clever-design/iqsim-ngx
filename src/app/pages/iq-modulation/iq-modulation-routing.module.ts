import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IqModulationComponent } from './iq-modulation/iq-modulation.component';

const routes: Routes = [
  { path: '', redirectTo: 'iq-modulation', pathMatch: 'full' },
  { path: 'iq-modulation', component: IqModulationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IqModulationRoutingModule {}
