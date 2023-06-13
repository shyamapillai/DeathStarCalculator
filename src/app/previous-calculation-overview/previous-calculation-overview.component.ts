//Landing page to do new calculation and view previous calculations

import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { VolumeCalculationComponent } from '../volume-calculation/volume-calculation.component';
import { VolumeGeneratedListService } from '../volume-generated-list.service';

@Component({
  selector: 'app-previous-calculation-overview',
  templateUrl: './previous-calculation-overview.component.html',
  styleUrls: ['./previous-calculation-overview.component.scss']
})
export class PreviousCalculationOverviewComponent implements OnInit {

  @ViewChild(VolumeCalculationComponent) volumeCalculation: any;
  constructor(
    private router: Router,
    private volListService: VolumeGeneratedListService
  ) { }

  public enemyPlanetVolumeArr: any = [];
  ngOnInit(): void {
    this.enemyPlanetVolumeArr = this.volListService.getEnemyPlanetList();
  }

  goToNewCalculation() {
    this.router.navigate(['/volume-calculation']);
  }
}
