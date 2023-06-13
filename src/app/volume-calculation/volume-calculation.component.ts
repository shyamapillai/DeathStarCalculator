import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, combineLatest, takeUntil } from 'rxjs';
import { SwapidevService } from '../swapidev.service';
import { VolumeGeneratedListService } from '../volume-generated-list.service';

@Component({
  selector: 'app-volume-calculation',
  templateUrl: './volume-calculation.component.html',
  styleUrls: ['./volume-calculation.component.scss']
})
export class VolumeCalculationComponent implements OnInit {

  selectedEnemies: any[] = [];
  totalVolume: number = 0;
  planetsArr: any[] = [];
  personPlanetMapping: any[] = [];
  planetIds: any[] = [];
  planetEnemyMap: any[] = [];
  enemyString: string = '';
  enemyListTotalVolume: any[] = [];

  constructor(
    private router: Router,
    private swapidev: SwapidevService,
    private volListService: VolumeGeneratedListService
  ) { }

  ngOnInit(): void {
    this.swapidev.getPlanetData().subscribe(response => {
      this.planetsArr = response.results;
    }, error => {
      console.log(error);
    });
  }

  calculateVolume(): number {
    this.selectedEnemies.forEach(person => {
      this.planetsArr.forEach(planet => {
        if (person.homeworld === planet.url) {
          const obj = {
            personname: person.name,
            homeworldid: person.homeworld,
            homeworlddiameter: planet.diameter
          }
          this.personPlanetMapping.push(obj);
        }
      })
    });

    for (const enemy of this.personPlanetMapping) {
      this.enemyString += enemy.personname + '/'
      if (this.planetEnemyMap.length == 0) {
        this.planetEnemyMap.push({
          id: enemy.homeworldid,
          diameter: enemy.homeworlddiameter
        });
        this.planetIds.push(enemy.homeworlddiameter);
      } else {
        this.planetEnemyMap.forEach((el) => {
          if (el.id !== enemy.homeworldid) {
            this.planetEnemyMap.push({
              id: enemy.homeworldid,
              diameter: enemy.homeworlddiameter
            });
            this.planetIds.push(enemy.homeworlddiameter);
          }
        });
      }
    }

    this.totalVolume = this.calculatePlanetVolume(this.planetIds);

    const el = {
      enemyList: this.enemyString,
      totalVolume: this.totalVolume
    }
    this.enemyListTotalVolume.push(el);
    this.volListService.setEnemyPlanetList(this.enemyListTotalVolume);
    console.log(this.planetsArr);

    return this.totalVolume;
  }

  calculatePlanetVolume(planets: any[]) {
    let totalVol = 0;
    planets.forEach((el) => {
      if (el > 0) {
        const radius = el / 2;
        const pi = Math.PI;
        const volume = (4 / 3) * pi * Math.pow(radius, 3);
        totalVol += volume;
      }
    });
    return totalVol;
  }

  receiveArray(arr: any[]) {
    this.selectedEnemies = arr;

  }

  backToHome(): void {
    this.router.navigate(['']);
  }
}
