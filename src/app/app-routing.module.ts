import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreviousCalculationOverviewComponent } from './previous-calculation-overview/previous-calculation-overview.component';
import { VolumeCalculationComponent } from './volume-calculation/volume-calculation.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: '', component: PreviousCalculationOverviewComponent },
  { path: 'volume-calculation', component: VolumeCalculationComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
